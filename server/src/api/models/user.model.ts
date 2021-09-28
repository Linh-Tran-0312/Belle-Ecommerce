import { StringValidator } from "@tsoa/runtime";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base.model";
import { Order } from "./order.model";

enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    CUSTOMER = 'customer'
};

export interface IUserCreateProps {
    fname: string;
    lname?: string;
    email: string;
    password: string;

}

export interface IUser extends Omit<IUserCreateProps, "password" | "email">, IBaseEntity {
    password?: string;
    email?: string;
    googleId?: string;
    phone?: string;
    address?: string;
}; 

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

    @Column()
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