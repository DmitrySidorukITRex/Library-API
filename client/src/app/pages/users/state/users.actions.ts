import { IUserApi } from 'src/app/shared/interfaces/user.interface';

export namespace Users {
  export class GetAll {
    static readonly type = '[USERS] Get Users';
  }

  export class Add {
    static readonly type = '[USERS] Add User';
    constructor(public payload: IUserApi) {}
  }

  export class Update {
    static readonly type = '[USERS] Update User';
    constructor(public id: string, public payload: IUserApi) {}
  }

  export class Remove {
    static readonly type = '[USERS] Remove User';
    constructor(public id: string) {}
  }
}
