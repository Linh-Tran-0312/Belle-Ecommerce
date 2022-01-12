import { IOrderBasicProps } from ".";
import { UserRole } from "../models";
export interface IUserUpdateProps {
  /** 
  * @pattern ^(?!\s*$).+ First name must not be empty
  */
  fname: string;
  /** 
  * @pattern ^(?!\s*$).+ Last name must not be empty
  */
  lname: string;
  /** 
  * @pattern ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$ Email is invalid
  */
  email: string;
  role?: UserRole;
  /** 
  * @maxLenth 12 Phone number is invalid
  * @minLength 9 Phone number is invalid
  * @pattern [0-9]{9,12} Phone number is invalid
  */
  phone: string;
  /** 
  * @minLength 5 Address is invalid
  */
  address: string;
}

export interface IUserCreateProps extends IUserUpdateProps {
  /** 
  * @minLength 6 Password must be at least 6 characters
  */
  password: string;
}

export interface IRequestLogin {
  /** 
  * @pattern ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$ Email is invalid
  */
  email: string;
  password: string;
}

// data returned after user log in successfully
export interface IUserAuth {
    id: number,
    fname: string,
    lname: string,
    phone: string,
   address: string,
   role: UserRole
}
// basic user info nested in other relations
export interface IUserName {
    id: number,
    fname: string,
    lname: string,
}
// data returned when admin searching
export interface IUserSearchProps {
    id: number,
    fname: string,
    lname: string,
    phone: string,
    address: string,
    email: string,
    role: UserRole,
    createdAt: Date,
    sale: number
}

// data returned when create or update user
export interface IUserWithOrders {
    id: number,
    fname: string,
    lname: string,
    phone: string,
    address: string,
    email: string,
    role: UserRole,
    createdAt: Date,
    orders?: IOrderBasicProps[]
}


