import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class PatientUpdateDto {
        @IsNotEmpty()
        @IsNumber()
        @Type(() => Number)
        patientId!: number;
        
        @IsOptional()
        @IsString()
        firstName!: string;

        @IsOptional()
        @IsString()
        lastName!: string;

        @IsOptional()
        @IsNumber()
        @Type(() => Number)
        age!: number;

        @IsOptional()
        @IsString()
        phoneNumber!: string;

        @IsOptional()
        @IsString()
        address!: string;

        @IsOptional()
        @IsString()
        gender!: string;
}