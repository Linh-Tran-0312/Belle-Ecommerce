
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Product } from ".";
import { CustomBaseEntity } from "./base.model";
import { Order } from "./order.model";

export enum UserRole {
    ALL = "all",
    ADMIN = 'admin',
    EDITOR = 'editor',
    CUSTOMER = 'customer'
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