import { IsNull } from "typeorm";
import { DatabaseBootstrap } from "../../bootstrap/database.bootstrap";
import { PatientEntity } from "./patient.entity";

export class PatientService{
    save(patient: PatientEntity) {
        const repository = DatabaseBootstrap.dataSource.getRepository(PatientEntity);
        return repository.save(patient);
    }

    getOne(patientId: number) {
        const repository = DatabaseBootstrap.dataSource.getRepository(PatientEntity);
        return repository.findOne({ where: { patientId, deletedAt: IsNull() } })
    }

    getAll() {
        const repository = DatabaseBootstrap.dataSource.getRepository(PatientEntity);
        return repository.find({ where: { deletedAt: IsNull() } })
    }

    async getByPage(page: number, limit: number) {
        const repository = DatabaseBootstrap.dataSource.getRepository(PatientEntity);
        const [result, total]= await repository.findAndCount({
                where: { deletedAt: IsNull() },
                skip: (page - 1) * limit,
                take: limit
            });

        return {
            result, total
        };

    }
}