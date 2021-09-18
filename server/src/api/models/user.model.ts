import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    CUSTOMER = 'customer'
};

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    fname!: string;

    @Column({nullable: true})
    lname!: string;

    @Column()
    email!: string;

    @Column({ nullable: true })
    phone!: string;

    @Column({select: false})
    password!: string;

    @Column({ nullable: true })
    address!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER
    })
    role!: UserRole;

    @CreateDateColumn()
    createdAt!: Date;
}