import { Router }  from "express";
import { PatientController} from "./patient.controller";
import { PatientService } from "./patient.service";

export class PatientRoute {
    readonly router: Router;

    constructor(private readonly controller: PatientController){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/page", this.controller.getByPage.bind(this.controller));
        this.router.put("/:patientId", this.controller.update.bind(this.controller));
        this.router.delete("/:patientId", this.controller.delete.bind(this.controller));
        this.router.get("/:patientId", this.controller.getOne.bind(this.controller));
        this.router.get("/", this.controller.getAll.bind(this.controller));
    }
}

const patientService = new PatientService();
const patientController = new PatientController(patientService);
export const patientRoute = new PatientRoute(patientController).router;