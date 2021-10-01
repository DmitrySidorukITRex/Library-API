export interface IUserForLogin {
    email: string,
    password: string,
}

export interface IUserForRegister extends IUserForLogin {
    name: string,
    lastName: string,
    address: string
}