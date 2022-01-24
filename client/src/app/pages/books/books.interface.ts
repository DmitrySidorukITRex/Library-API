import { IUserBook } from '../../shared/interfaces/user.interface';

export interface IBook {
  name: string;
  author: string;
  category: string[];
  annotation: string;
  originalName: string;
  originalAuthor: string;
  availability: string[];
  isAvailable: boolean;
  books: IUserBook[];
  userId: string;
  _id: string;
}

export interface ICreateBook {
  name: string;
  author: string;
  category: string[];
  annotation: string;
  originalName?: string;
  originalAuthor?: string;
  availability: string[];
}
