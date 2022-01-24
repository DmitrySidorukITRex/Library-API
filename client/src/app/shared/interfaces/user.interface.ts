export interface IUserForLogin {
    email: string,
    password: string,
}

export interface IUserForRegister extends IUserForLogin {
    name: string,
    lastName: string,
    address: string
}

interface IUser {
    name: string,
    address: string,
    email: string,
    penaltyDueDate: string
}

export interface IUserView extends IUser {
    books: string,
    id: string
}

export interface IUserApi extends IUser {
    lastName: string,
    books: IUserBook[],
    isAdmin: boolean,
    _id: string
}

export interface IUserBook {
    name: string,
    id: string,
    isTakeAway: boolean,
    takingTime?: Date
}