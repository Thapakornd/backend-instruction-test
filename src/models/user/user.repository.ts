import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findOneByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({ username })
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email })
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return new this.userModel(createUserDto).save();
    }
}