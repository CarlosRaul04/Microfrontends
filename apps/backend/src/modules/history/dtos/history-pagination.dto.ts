import { IsNotEmpty, IsNumber } from "class-validator";

export class HistoryPaginationDto {
    @IsNotEmpty()
    @IsNumber()
    page!: number;

    @IsNotEmpty()
    @IsNumber()
    limit!: number;
}