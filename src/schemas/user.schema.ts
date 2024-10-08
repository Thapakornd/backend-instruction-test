import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    unique: true,
    index: true,
  })
  username: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  password: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  firstName: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  lastName: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  lot: number;

  @Prop({ default: 0, type: mongoose.Schema.Types.Number })
  commissionMoney: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  registerCodeId: User;

  @Prop({ type: mongoose.Schema.Types.String })
  code: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
