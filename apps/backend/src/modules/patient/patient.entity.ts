import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { HistoryEntity } from "../history/history.entity";

@Entity({name: "patients"})
export class PatientEntity{
    @PrimaryGeneratedColumn()
    patientId!: number;

    @Column({ type: "varchar", length: 100})
    firstName!: string;

    @Column({ type: "varchar", length: 100})
    lastName!: string;

    @Column({ type: "int"})
    age!: number;

    @Column({ type: "varchar", length: 100})
    email!: string;
    
    @Column({ type: "varchar", length: 100})
    phoneNumber!: string;

    @Column({ type: "varchar", length: 100})
    address!: string;

    @Column({ type: "varchar", length: 10})
    gender!: string;

    @OneToMany(() => HistoryEntity, history => history.patient)
    histories!: HistoryEntity[];
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt: Date | undefined;
    
    @Column({ type: "timestamp", nullable: true })
    deletedAt: Date | undefined;

    constructor() {

    }
}