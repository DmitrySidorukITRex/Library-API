import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserBook } from '../../shared/interfaces/user.interface';
import { IBook, ICreateBook } from './books.interface';

@Injectable()
export class BooksService {
  constructor(private readonly http: HttpClient) {}

  public getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>('api/books');
  }

  public createBook(book: ICreateBook): Observable<IBook[]> {
    return this.http.post<IBook[]>('api/books', book);
  }

  public updateBook(id: string, book: ICreateBook): Observable<IBook> {
    return this.http.patch<IBook>(`api/books/${id}`, book);
  }

  public removeBook(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`api/books/${id}`);
  }
}
