import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUserApi, IUserBook } from "../interfaces/user.interface";

@Injectable()
export class UserBookService {

    constructor(private readonly http: HttpClient) { }

    public getUserById(id: string): Observable<IUserApi> {
        return this.http.get<IUserApi>(`api/users/${id}`);
    }

    public takeUserBook(id: string, book: IUserBook): Observable<IUserApi> {
        return this.http.patch<IUserApi>(`api/users/${id}/take-book`, {book});
    }

    public returnUserBook(id: string, books: IUserBook[]): Observable<IUserApi> {
        return this.http.patch<IUserApi>(`api/users/${id}/return-book`, {books});
    }
}