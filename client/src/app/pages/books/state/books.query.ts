import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BooksState, BooksStore } from './books.store';

@Injectable({
  providedIn: 'root',
})
export class BooksQuery extends QueryEntity<BooksState> {
  books$ = this.select((state) => state.entities?.books);

  constructor(protected store: BooksStore) {
    super(store);
  }
}
