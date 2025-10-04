import { IsNotEmpty, IsNumber } from "class-validator";

export class PatientPaginationDto {
    @IsNotEmpty()
    @IsNumber()
    page!: number

    @IsNotEmpty()
    @IsNumber()
    limit!: number
}