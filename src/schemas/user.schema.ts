import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User {

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    username: string;
    
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    email: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    password: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    firstName: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    lastName: string;

    @Prop({ default: 0 , type: mongoose.Schema.Types.String })
    commissionMoney: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    commissionUser: User[];

    @Prop({ type: mongoose.Schema.Types.String })
    code: string;
}

export const UserSchema = SchemaFactory.createForClass(User);