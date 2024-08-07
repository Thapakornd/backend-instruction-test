import { Request } from "express";
import { CreateUserDto } from "src/models/user/dto/create-user.dto";

export interface PassportRequest extends Request {
    user: PassportUser;
}

interface PassportUser extends CreateUserDto {}