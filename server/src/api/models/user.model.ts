
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Product } from ".";
import { CustomBaseEntity, IBaseEntity } from "./base.model";
import { Order } from "./order.model";

export enum UserRole {
    ALL = "all",
    ADMIN = 'admin',
    EDITOR = 'editor',
    CUSTOMER = 'customer'
};

export interface IUserCreateProps {
    fname: string;
    lname?: string;
    email: string;
    password: string;
    role?: UserRole;

}

export interface IUser extends Omit<IUserCreateProps, "password" | "email">, IBaseEntity {
    password?: string;
    email?: string;
    googleId?: string;
    phone?: string;
    address?: string;
    orders?: Order[]
}; 

@Entity()
export class User extends CustomBaseEntity implements IUserCreateProps {

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

    @ManyToMany(() => Product)
    @JoinTable()
    wishList!: Product[];

    @OneToMany(() => Order, order => order.user)
    orders!: Array<Order>
}