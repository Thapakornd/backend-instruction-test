import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findOneByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({ username })
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email })
    }
}