import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICreateBook } from '../books.interface';
import { BooksService } from '../books.service';
import { BooksStore } from './books.store';

@UntilDestroy()
@Injectable()
export class BooksStateService {
  constructor(
    private readonly booksService: BooksService,
    private readonly booksStore: BooksStore
  ) {}

  public getAll(): void {
    this.booksService
      .getAllBooks()
      .pipe(untilDestroyed(this))
      .subscribe((books) => {
        this.booksStore.set({ books: books });
      });
  }

  public add(book: ICreateBook): Observable<any> {
    return this.booksService.createBook(book).pipe(
      untilDestroyed(this),
      tap((book) => {
        this.booksStore.add(book);
      })
    );
  }

  public update(id: string, book: ICreateBook): Observable<any> {
    return this.booksService.updateBook(id, book).pipe(
      untilDestroyed(this),
      tap((book) => {
        this.booksStore.update(id, book);
      })
    );
  }

  public remove(id: string): Observable<any> {
    return this.booksService.removeBook(id).pipe(
      untilDestroyed(this),
      tap(() => {
        this.booksStore.remove(id);
      })
    );
  }
}
