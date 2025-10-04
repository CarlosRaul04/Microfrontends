import { validate } from "class-validator";
import { HistoryCreateDto } from "./dtos/history-create.dto";
import { HistoryService } from "./history.service";
import { Request, Response } from "express";
import { HistoryUpdateDto } from "./dtos/history-update.dto";
import { HistoryIdDto } from "./dtos/history-id.dto";
import { HistoryPaginationDto } from "./dtos/history-pagination.dto";
import { HistoryEntity } from "./history.entity";
import { PatientService } from "../patient/patient.service";
import { PatientIdDto } from "../patient/dtos/patient-id.dto";

export class HistoryController {
    constructor(private readonly serviceHistory: HistoryService, private readonly servicePatient: PatientService) {}

    async create(request: Request, response: Response) {
        const { medicName, paramedicName, dateAttention, sympthoms, observations, medicines, diagnostic, patientId } = request.body;

        const history = new HistoryCreateDto();
        history.medicName = medicName;
        history.paramedicName = paramedicName;
        history.dateAttention = new Date(dateAttention);
        history.sympthoms = sympthoms;
        history.observations = observations;
        history.medicines = medicines;
        history.diagnostic = diagnostic;


        
        const errors = await validate(history);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const patient = await this.servicePatient.getOne(patientId);
        if(!patient) {
            return response.status(404).send("Patient not found");
        }
        
        const entity = new HistoryEntity();
        entity.medicName = history.medicName;
        entity.paramedicName = history.paramedicName;
        entity.dateAttention = history.dateAttention;
        entity.sympthoms = history.sympthoms;
        entity.observations = history.observations;
        entity.medicines = history.medicines;
        entity.diagnostic = history.diagnostic;
        entity.createdAt = new Date();
        entity.patient = patient // Assign patient relation

        const result = await this.serviceHistory.save(entity);

        response.status(201).json(result);
    }

    async update(request: Request, response: Response) {
        const { historyId } = request.params;
        const { medicName, paramedicName, dateAttention, sympthoms, observations, medicines, diagnostic } = request.body;

        const history = new HistoryUpdateDto();
        history.historyId = +historyId;
        history.medicName = medicName;
        history.paramedicName = paramedicName;
        history.dateAttention = new Date(dateAttention);
        history.sympthoms = sympthoms;
        history.observations = observations;
        history.medicines = medicines;
        history.diagnostic = diagnostic;

        const errors = await validate(history);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const historyFound = await this.serviceHistory.getOne(history.historyId);
        if (!historyFound) {
            return response.status(404).send("History not found");
        }

        historyFound.updatedAt = new Date();

        const result = await this.serviceHistory.save(Object.assign(historyFound, history));

        response.status(201).json(result);
    }

    async delete(request: Request, response: Response) {
        const { historyId } = request.params;

        const history = new HistoryIdDto();
        history.historyId = +historyId;

        const errors = await validate(history);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const historyFound = await this.serviceHistory.getOne(history.historyId);
        if (!historyFound) {
            return response.status(404).send("History not found");
        }

        historyFound.deletedAt = new Date();

        const result = await this.serviceHistory.save(historyFound);

        response.status(204).json(result);
    }

    async getOne(request: Request, response: Response) {
        const { historyId } = request.params;

        const history = new HistoryIdDto();
        history.historyId = +historyId;

        const errors = await validate(history);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const historyFound = await this.serviceHistory.getOne(history.historyId);
        if (!historyFound) {
            return response.status(404).send("History not found");
        }

        response.status(200).json(historyFound);
    }

    async getAll(request: Request, response: Response) {
        const result = await this.serviceHistory.getAll();

        response.status(200).json(result);
    }

    async getByPatientId(request: Request, response:Response){
        const {patientId} = request.params;

        const patient = new PatientIdDto();
        patient.patientId = +patientId

        const errors = await validate(patient);
        if(errors.length > 0) {
            return response.status(411).send(errors);
        }

        const result = await this.serviceHistory.getByPatientId(patient.patientId);

        response.status(200).json(result);
    }

    async getByPage(request: Request, response: Response) {
        const page = request.query.page ? parseInt(request.query.page as string, 10) : 1;
        const limit = request.query.limit ? parseInt(request.query.limit as string, 10) : 10;

        const pagination = new HistoryPaginationDto();
        pagination.page = page;
        pagination.limit = limit;

        const errors = await validate(pagination);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const result = await this.serviceHistory.getByPage(pagination.page, pagination.limit);

        response.status(200).json(result);
    }
}