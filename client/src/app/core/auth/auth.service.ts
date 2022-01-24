import { Injectable } from '@angular/core';
import { IUserApi, IUserForLogin, IUserForRegister } from 'src/app/shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    private token: string = '';
    private isAdmin: boolean = false;
    private userId: string;

    constructor(private http: HttpClient) { }

    public register(user: IUserForRegister): Observable<IUserForRegister> {
        return this.http.post<IUserForRegister>('api/auth/register', user);
    }

    public login(user: IUserForLogin): Observable<{token: string, isAdmin: boolean, userId: string}> {
        return this.http.post<{token: string, isAdmin: boolean, userId: string}>('/api/auth/login', user)
            .pipe(
                tap(({token, isAdmin, userId}) => {
                    localStorage.setItem('auth-token', token);
                    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
                    localStorage.setItem('userId', userId);
                    this.setToken(token);
                    this.setAdmin(isAdmin);
                    this.setUserId(userId);
                })
            );
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }

    public isAuthenticated(): boolean {
        return !!this.token;
    }

    public logout(): void {
        this.setToken('');
        localStorage.clear();
    }

    public setAdmin(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }

    public getAdmin(): boolean {
        return this.isAdmin;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getUserId(): string {
        return this.userId;
    }
}
