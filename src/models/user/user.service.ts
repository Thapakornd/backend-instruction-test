import { Body, ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createHash } from 'crypto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  ResponseUserDto,
  ResponseCodeDto,
  ResponseLotDto,
} from './dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CodeUsedEvent } from 'src/common/events/code-used.event';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private eventEmitter: EventEmitter2,
  ) {}

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

    // get own code user id with registerCode
    const ownCodeId = createUserDto?.registerCode
      ? await this.userRepository.findOneByCode(createUserDto.registerCode)
      : null;
    if (createUserDto?.registerCode && ownCodeId === null)
      throw new ConflictException('code register does not exist');
    const registerCodeId = ownCodeId?._id;

    const lot = this.getLot(
      createUserDto.username,
      createUserDto.firstName,
      createUserDto.lastName,
    );

    await this.userRepository.create({
      ...createUserDto,
      lot,
      registerCodeId,
      password: hashedPassword,
    });

    // send event redeem code
    if (registerCodeId) {
      this.eventEmitter.emit('code.used', {
        username: createUserDto.username,
        ownCodeId: registerCodeId,
        code: createUserDto?.registerCode,
      } as CodeUsedEvent);
    }
  }

  async findOneByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<ResponseUserDto> {
    if (usernameOrEmail)
      return this.userRepository.findOneByUsernameOrEmail(usernameOrEmail);
    throw new Error('username or email should not empty.');
  }

  async findOneByUsername(username: string): Promise<ResponseUserDto> {
    return await this.userRepository.findOneByUsername(username);
  }

  async findOneById(id: string) {
    return await this.userRepository.findOneById(id);
  }

  async getCode(user: ResponseUserDto): Promise<ResponseCodeDto> {
    const userCodeExist = await this.userRepository.findCodeById(user._id);

    const userCode = userCodeExist?.code
      ? userCodeExist.code
      : this.generateCode(user.firstName, user.lastName);

    if (!userCodeExist?.code) {
      await this.userRepository.insertCode(user._id, userCode);
    }

    return plainToInstance(ResponseCodeDto, { code: userCode });
  }

  async findLot(user: ResponseUserDto): Promise<ResponseLotDto> {
    const userLot = await this.userRepository.findLotById(user._id);
    return plainToInstance(ResponseLotDto, userLot);
  }

  private generateCode(firstname: string, lastname: string): string {
    const timestamp = Date.now();
    const data = `${firstname}-${lastname}-${timestamp}`;
    return createHash('sha-256')
      .update(data)
      .digest('hex')
      .substring(0, 10)
      .toUpperCase();
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
