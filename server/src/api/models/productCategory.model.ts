import { CreateDateColumn, Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class ProductCategory {

    @PrimaryGeneratedColumn()
    id!: Number;

    @Column()
    name!: string;

    @Column({nullable: true})
    imagePath!: string

    @CreateDateColumn()
    createdAt!: Date;

}