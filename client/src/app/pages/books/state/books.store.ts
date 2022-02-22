import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IBook } from '../books.interface';

export interface BooksState extends EntityState<any, any> {
  books: IBook[];
}

const initialState = {};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'books' })
export class BooksStore extends EntityStore<any> {
  constructor() {
    super(initialState);
  }
}
