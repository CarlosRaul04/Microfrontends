import express, { Application } from "express"; 
import { patientRoute } from "./modules/patient/patient.routes";
import { historyRoute } from "./modules/history/history.routes";

class App {
    readonly app: Application

    constructor() {
        this.app = express();

        this.initializeMiddleware();
        this.initializeRouter();
    }

    private initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true}));
    }

    private initializeRouter() {

        this.app.use('/patient', patientRoute);
        this.app.use('/history', historyRoute);
    }   


}

export const app = new App().app;