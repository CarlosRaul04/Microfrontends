import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class HistoryUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    historyId!: number;

    @IsOptional()
    @IsString()
    medicName!: string;

    @IsOptional()
    @IsString()
    paramedicName!: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateAttention!: Date;

    @IsOptional()
    @IsString()
    sympthoms!: string;

    @IsOptional()
    @IsString()
    observations!: string;

    @IsOptional()
    @IsString()
    medicines!: string;

    @IsOptional()
    @IsString()
    diagnostic!: string;
}