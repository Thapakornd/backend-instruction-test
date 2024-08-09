import { Expose } from "class-transformer";

export class ResponseCodeDto {
    @Expose()
    code: string;
}