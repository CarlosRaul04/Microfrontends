import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "../patient/patient.entity";

@Entity({ name: "history" })
export class HistoryEntity {
    @PrimaryGeneratedColumn()
    historyId!: number;

    @Column({ type: "varchar", length: 100 })
    medicName!: string;

    @Column({ type: "varchar", length: 100 })
    paramedicName!: string;

    @Column({ type: "timestamp" })
    dateAttention!: Date;

    @Column({ type: "text" })
    sympthoms!: string;

    @Column({ type: "text" })
    observations!: string;

    @Column({ type: "text" })
    medicines!: string;

    @Column({ type: "text" })
    diagnostic!: string;

    @ManyToOne(() => PatientEntity, patient => patient.patientId)
    @JoinColumn({ name: "patientId" })
    patient!: PatientEntity;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt: Date | undefined;

    @Column({ type: "timestamp", nullable: true })
    deletedAt: Date | undefined;
}