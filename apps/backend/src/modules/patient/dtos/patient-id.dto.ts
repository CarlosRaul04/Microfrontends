import { IsNotEmpty, IsNumber } from "class-validator";

export class PatientIdDto {
    @IsNotEmpty()
    @IsNumber()
    patientId!: number;
}