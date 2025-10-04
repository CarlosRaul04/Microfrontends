import { IsNull } from "typeorm";
import { DatabaseBootstrap } from "../../bootstrap/database.bootstrap";
import { HistoryEntity } from "./history.entity";

export class HistoryService {
    save(history: HistoryEntity) {
        const repository = DatabaseBootstrap.dataSource.getRepository(HistoryEntity);
        return repository.save(history);
    }

    getOne(historyId: number) {
        const repository = DatabaseBootstrap.dataSource.getRepository(HistoryEntity);
        return repository.findOne({ where: { historyId, deletedAt: IsNull() } });
    }

    getAll() {
        const repository = DatabaseBootstrap.dataSource.getRepository(HistoryEntity);
        return repository.find({
             where: { deletedAt: IsNull() },
             relations: ['patient']   
        });
    }

    getByPatientId(patientId: number) {
        const repository = DatabaseBootstrap.dataSource.getRepository(HistoryEntity);
        return repository.find({
            where: { patient: {patientId}, deletedAt: IsNull()},
            relations: ['patient']
        })
    }

    async getByPage(page: number, limit: number) {
        const repository = DatabaseBootstrap.dataSource.getRepository(HistoryEntity);
        const [result, total] = await repository.findAndCount({
            where: { deletedAt: IsNull() },
            skip: (page - 1) * limit,
            take: limit,
        });

        return { result, total };
    }
}