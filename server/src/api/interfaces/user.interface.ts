export interface BasicUser {
    id: number
}

export interface User extends BasicUser {
    fname: string,
    lname: string,
    email: string,
    password: string,
}

export interface DetailUser extends User {
    phone: string,
    city: string,
    district: string,
    ward: string,
    street: string,
    createdAt: string
}