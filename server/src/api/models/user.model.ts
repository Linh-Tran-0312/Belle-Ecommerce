import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Order } from ".";

enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    CUSTOMER = 'customer'
};

export interface IUserModel {
    id?: number;
    fname?: string;
    lname?: string;
    googleId?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    role?: UserRole;
    userId?: string;
}

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

    @Column({nullable: true})
    googleId!: string;

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

    @CreateDateColumn({ type: "timestamptz"})
    createdAt!: Date;

    @OneToMany(() => Order, order => order.user)
    orders!: Array<Order>
}