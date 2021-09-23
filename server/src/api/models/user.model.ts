import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Order } from "./order.model";
import { BaseEntity, IBaseEntity } from "./base.model";
enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    CUSTOMER = 'customer'
};

export interface IUserCreateProps {
    fname: string;
    lname?: string;
    googleId?: string;
    email: string;
    password?: string;
    phone?: string;
    address?: string;
    role?: UserRole;
}

export interface IUser extends IUserCreateProps, IBaseEntity {}; 

@Entity()
export class User extends BaseEntity implements IUserCreateProps {

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


    @OneToMany(() => Order, order => order.user)
    orders!: Array<Order>
}