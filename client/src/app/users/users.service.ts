import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserApi } from '../shared/interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(private readonly http: HttpClient) { }

    public getUsers(): Observable<IUserApi[]> {
        return this.http.get<IUserApi[]>('api/users');
    }

    public getUserById(id: string): Observable<IUserApi> {
        return this.http.get<IUserApi>(`api/users/${id}`);
    }

    public createUser(user: IUserApi): Observable<IUserApi> {
        return this.http.post<IUserApi>('api/users', user);
    }

    public updateUser(id: string, user: IUserApi): Observable<IUserApi> {
        return this.http.patch<IUserApi>(`api/users/${id}`, user);
    }

    public removeUser(id: string): Observable<{message: string}> {
        return this.http.delete<{message: string}>(`api/users/${id}`);
    }
}
