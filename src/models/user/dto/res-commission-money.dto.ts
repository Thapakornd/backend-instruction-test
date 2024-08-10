import { Expose } from "class-transformer";

export class ResponseCommissionMoneyDto {
    
    @Expose()
    commissionMoney: number;
}