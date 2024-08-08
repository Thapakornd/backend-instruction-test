import { Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
