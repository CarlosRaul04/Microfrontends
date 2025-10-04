import { IsNotEmpty, IsString, IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class HistoryCreateDto {
    @IsNotEmpty()
    @IsString()
    medicName!: string;

    @IsNotEmpty()
    @IsString()
    paramedicName!: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    dateAttention!: Date;

    @IsNotEmpty()
    @IsString()
    sympthoms!: string;

    @IsNotEmpty()
    @IsString()
    observations!: string;

    @IsNotEmpty()
    @IsString()
    medicines!: string;

    @IsNotEmpty()
    @IsString()
    diagnostic!: string;
}