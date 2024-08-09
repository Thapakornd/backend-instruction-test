import { Expose } from "class-transformer";

export class ResponseLotDto {
    @Expose()
    lot: number;
}