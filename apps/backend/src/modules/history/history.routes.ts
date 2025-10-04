import { Router } from "express";
import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";
import { PatientService } from "../patient/patient.service";

export class HistoryRoute {
    readonly router: Router;

    constructor(private readonly controller: HistoryController){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/page", this.controller.getByPage.bind(this.controller));
        this.router.get("/patient/:patientId", this.controller.getByPatientId.bind(this.controller));
        this.router.put("/:historyId", this.controller.update.bind(this.controller));
        this.router.delete("/:historyId", this.controller.delete.bind(this.controller));
        this.router.get("/:historyId", this.controller.getOne.bind(this.controller));
        this.router.get("/", this.controller.getAll.bind(this.controller));
    }
}

const historyService = new HistoryService();
const patientService = new PatientService();
const historyController = new HistoryController(historyService, patientService);
export const historyRoute = new HistoryRoute(historyController).router;


