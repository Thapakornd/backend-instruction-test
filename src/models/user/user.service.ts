import { Body, ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { createHash } from 'crypto';
import { ResponseUserDto } from './dto/res-user.dto';
import { User } from 'src/schemas/user.schema';
import { plainToInstance } from 'class-transformer';
import { ResponseCodeDto } from './dto/res-code.dto';
import * as bcrypt from 'bcrypt';
import { ResponseLotDto } from './dto/res-lot.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    const [usernameExist, emailExist] = await Promise.all([
      this.userRepository.findOneByUsername(createUserDto.username),
      this.userRepository.findOneByEmail(createUserDto.email),
    ]);

    if (emailExist && usernameExist)
      throw new ConflictException('username and email already exist');
    if (usernameExist) throw new ConflictException('username already exist');
    if (emailExist) throw new ConflictException('email already exist.');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const ownCodeUsername = createUserDto?.registerCode
      ? await this.userRepository.findOneByCode(createUserDto.registerCode)
      : null;
    if (createUserDto?.registerCode && ownCodeUsername === null)
      throw new ConflictException('code register does not exist');

    const registerCode =
      createUserDto?.registerCode && ownCodeUsername
        ? createUserDto.registerCode
        : '';

    const lot = this.getLot(
      createUserDto.username,
      createUserDto.firstName,
      createUserDto.lastName,
    );

    await this.userRepository.create({
      ...createUserDto,
      lot,
      registerCode,
      password: hashedPassword,
    });
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    if (usernameOrEmail)
      return this.userRepository.findOneByUsernameOrEmail(usernameOrEmail);
    throw new Error('username or email should not empty.');
  }

  async findOneByUsername(username: string): Promise<ResponseUserDto> {
    return await this.userRepository.findOneByUsername(username);
  }

  async getCode(user: ResponseUserDto): Promise<ResponseCodeDto> {
    const userCodeExist = await this.userRepository.findCodeByUsername(
      user.username,
    );
    
    const userCode =
      userCodeExist?.code
        ? userCodeExist.code
        : this.generateCode(user.firstName, user.lastName);
    
    if (!userCodeExist?.code) {
      await this.userRepository.insertCode(user.username, userCode)
    } 

    return plainToInstance(ResponseCodeDto, { code: userCode });
  }

  async findLot(user: ResponseUserDto): Promise<ResponseLotDto> {
    const userLot = await this.userRepository.findLotByUsername(user.username);
    return plainToInstance(ResponseLotDto, userLot);
  }

  private generateCode(firstname: string, lastname: string): string {
    const timestamp = Date.now();
    const data = `${firstname}-${lastname}-${timestamp}`;
    return createHash('sha-256').update(data).digest('hex').substring(0, 10).toUpperCase();
  }

  private getLot(
    username: string,
    firstname: string,
    lastname: string,
  ): number {
    return Math.max(
      2,
      Math.min(30, username.length + firstname.length + lastname.length),
    );
  }
}
