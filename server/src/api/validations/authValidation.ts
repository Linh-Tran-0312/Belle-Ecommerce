import { UserRole } from "../models";
export class ValidateUserUpdateModel {
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

  constructor(fname: string,
    lname: string,
    email: string,
    phone: string,
    address: string,
    role?: UserRole) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.role = role;
    this.phone = phone;
    this.address = address;
  }
}

export class ValidateUserCreateModel extends ValidateUserUpdateModel {

  /** 
  * @minLength 6 Password must be at least 6 characters
  */
  password: string;

  constructor(fname: string,
    lname: string,
    email: string,
    password: string,

    phone: string,
    address: string,
    role?: UserRole,) {
    super(fname, lname, email, phone, address, role)
    this.password = password;
  }
}

export class ValidateLoginModel {
  /** 
  * @pattern ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$ Email is invalid
  */
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

