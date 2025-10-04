import { IsNotEmpty, IsNumber } from "class-validator";

export class HistoryIdDto {
    @IsNotEmpty()
    @IsNumber()
    historyId!: number;
}