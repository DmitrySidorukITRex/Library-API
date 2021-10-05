import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from './books.interface';

@Injectable()
export class BooksService {

    constructor(
        private readonly http: HttpClient
    ) { }

    public getAllBooks(): Observable<IBook[]> {
        return this.http.get<IBook[]>('api/books');
    }
}
