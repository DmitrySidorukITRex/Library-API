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
    penalty: number,
    email: string
}

export interface IUserView extends IUser {
    books: string,
    id: string
}

export interface IUserApi extends IUser {
    lastName: string,
    books: {name: string, bookId: string}[],
    isAdmin: boolean,
    _id: string
}