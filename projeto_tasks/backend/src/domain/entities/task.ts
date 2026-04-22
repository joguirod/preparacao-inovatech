import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity("task")
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(() => User, {eager: true, onDelete: "CASCADE"})
    @JoinColumn({name: "creator_id"})
    creator!: User;

    @CreateDateColumn()
    createdAt!: Date;
}