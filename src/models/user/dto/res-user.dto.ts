import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class ResponseUserDto {
  @Expose()
  _id: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  password: string;

  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}
