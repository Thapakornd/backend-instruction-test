import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/models/user/dto/create-user.dto';
import { UserService } from 'src/models/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const [usernameExist, emailExist] = await Promise.all([
      this.userService.findOneByUsername(createUserDto.username),
      this.userService.findOneByEmail(createUserDto.email),
    ]);

    if (usernameExist) throw new ConflictException('username already exist');
    if (emailExist) throw new ConflictException('email already exist.');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<User | null> {
    const user =
      await this.userService.findOneByUsernameOrEmail(usernameOrEmail);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return user;
  }
}
