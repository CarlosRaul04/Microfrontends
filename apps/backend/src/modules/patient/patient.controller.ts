import { validate } from "class-validator";
import { PatientCreateDto } from "./dtos/patient-create.dto";
import { PatientService } from "./patient.service";
import { Request, Response } from "express";
import { PatientUpdateDto } from "./dtos/patient-update.dto copy";
import { PatientIdDto } from "./dtos/patient-id.dto";
import { PatientPaginationDto } from "./dtos/patient-pagination.dto";
import { PatientEntity } from "./patient.entity";

export class PatientController {
    constructor(private readonly service: PatientService) {}

    async create(request: Request, response: Response) {
        const { firstName, lastName, age, email, phoneNumber, address, gender } = request.body;

        const patient = new PatientCreateDto();
        patient.firstName = firstName;
        patient.lastName = lastName;
        patient.age = age;
        patient.email = email;
        patient.phoneNumber = phoneNumber;
        patient.address = address;
        patient.gender = gender;

        const errors = await validate(patient);
        if(errors.length > 0){
            return response.status(411).send(errors);
        }

        const entity = new PatientEntity();
        entity.firstName = patient.firstName;
        entity.lastName = patient.lastName;
        entity.age = patient.age;
        entity.email = patient.email;
        entity.phoneNumber = patient.phoneNumber;
        entity.address = patient.address;
        entity.gender = patient.gender;
        entity.createdAt = new Date();

        const result = await this.service.save(entity);

        response.status(201).json(result);
    }

    async update(request: Request, response: Response) {
        const { patientId } = request.params;
        const { firstName, lastName, age, phoneNumber, address, gender } = request.body;

        const patient = new PatientUpdateDto();
        // El simbolo + transforma en number a la propiedad
        patient.patientId = +patientId;
        patient.firstName = firstName;
        patient.lastName = lastName;
        patient.age = age;
        patient.phoneNumber = phoneNumber;
        patient.address = address;
        patient.gender = gender;

        const errors = await validate(patient);
        if(errors.length > 0) {
            return response.status(411).send(errors);
        }

        const patientFound = await this.service.getOne(patient.patientId);
        if(!patientFound){
            return response.status(404).send("Patient not found");
        }

        patientFound.updatedAt = new Date();

        const result = await this.service.save(Object.assign(patientFound, patient));

        response.status(201).json(result);
    }

    async delete(request: Request, response: Response) {
        const { patientId } = request.params;

        const patient = new PatientIdDto();
        patient.patientId = +patientId;

        const errors = await validate(patient);
        if(errors.length > 0) {
            return response.status(411).send(errors);
        }

        const patientFound = await this.service.getOne(patient.patientId);
        if(!patientFound){
            return response.status(404).send("Patient not found");
        }

        patientFound.deletedAt = new Date();

        const result = await this.service.save(patientFound);

        response.status(204).json(result);
    }

    async getOne(request: Request, response: Response) {
        const { patientId } = request.params

        const patient = new PatientIdDto();
        patient.patientId = +patientId;

        const errors = await validate(patient);
        if(errors.length > 0) {
            return response.status(411).send(errors);
        }

        const patientFound = await this.service.getOne(patient.patientId);
        if(!patientFound){
            return response.status(404).send("Patient not found");
        }

        response.status(200).json(patientFound);
    }

    async getAll(request: Request, response: Response) {
        const result = await this.service.getAll();

        response.status(200).json(result);
    }

    async getByPage(request: Request, response: Response) {

        const page = request.query.page ? parseInt(request.query.page as string, 10): 1;
        const limit = request.query.limit ? parseInt(request.query.limit as string, 10) : 10;

        const pagination = new PatientPaginationDto()
        pagination.page = page;
        pagination.limit = limit;

        const errors = await validate(pagination);
        if(errors.length > 0) {
            return response.status(411).send(errors);
        }

        const result = await this.service.getByPage(pagination.page, pagination.limit);

        response.status(200).json(result);
    }
}