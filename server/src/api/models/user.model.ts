
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Product } from ".";
import { CustomBaseEntity, IBaseEntity } from "./base.model";
import { IOrder, Order } from "./order.model";

export enum UserRole {
    ALL = "all",
    ADMIN = 'admin',
    EDITOR = 'editor',
    CUSTOMER = 'customer'
};

export interface IUserCreateProps {
    fname: string;
    lname: string;
    email: string;
    password: string;
    role?: UserRole;
    phone?: string,
    address?: string

}

export interface IUser extends Omit<IUserCreateProps, "password" | "email">, IBaseEntity {
    password?: string;
    email?: string;
    token?: string;
    phone?: string;
    address?: string;
    role?: UserRole;
    orders?: IOrder[]
}; 

@Entity()
export class User extends CustomBaseEntity {

    @Column()
    fname!: string;

    @Column({nullable: true})
    lname!: string;

    @Column()
    email!: string;

    @Column({nullable: true})
    token!: string;

    @Column({ nullable: true, default: "" })
    phone!: string;

    @Column()
    password!: string;

    @Column({ nullable: true, default: "" })
    address!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER
    })
    role!: UserRole;

    @ManyToMany(() => Product)
    @JoinTable()
    wishList!: Product[];

    @OneToMany(() => Order, order => order.user)
    orders!: Array<Order>
}