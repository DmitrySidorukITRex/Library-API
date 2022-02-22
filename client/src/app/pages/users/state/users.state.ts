import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { append, removeItem, updateItem } from '@ngxs/store/operators';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUserApi } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from '../users.service';
import { Users } from './users.actions';

@State<IUserApi[]>({
  name: 'users',
  defaults: [],
})
@Injectable()
export class UsersState {
  constructor(private readonly usersService: UsersService) {}

  @Action(Users.GetAll)
  getUsers(ctx: StateContext<IUserApi[]>): Observable<IUserApi[]> {
    return this.usersService.getUsers().pipe(
      tap((users) => {
        ctx.setState(users);
      })
    );
  }

  @Action(Users.Add)
  addUser(
    ctx: StateContext<IUserApi[]>,
    action: Users.Add
  ): Observable<IUserApi> {
    return this.usersService.createUser(action.payload).pipe(
      tap((user) => {
        ctx.setState(append([user]));
      })
    );
  }

  @Action(Users.Update)
  updateUser(
    ctx: StateContext<IUserApi[]>,
    action: Users.Update
  ): Observable<IUserApi> {
    return this.usersService.updateUser(action.id, action.payload).pipe(
      tap((user) => {
        ctx.setState(
          updateItem((user) => user?._id === action.id, action.payload)
        );
      })
    );
  }

  @Action(Users.Remove)
  removeUser(
    ctx: StateContext<IUserApi[]>,
    action: Users.Remove
  ): Observable<{ message: string }> {
    return this.usersService.removeUser(action.id).pipe(
      tap(() => {
        ctx.setState(removeItem((user) => user?._id === action.id));
      })
    );
  }
}
