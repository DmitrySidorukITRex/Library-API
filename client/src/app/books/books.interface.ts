export interface IBook {
    name: string,
    author: string,
    category: string[],
    annotation: string,
    originalName: string,
    originalAuthor: string,
    isAvailable: boolean,
    userId: string,
    _id: string
}

export interface ICreateBook {
    name: string,
    author: string,
    category: string[],
    annotation: string,
    originalName?: string,
    originalAuthor?: string
}