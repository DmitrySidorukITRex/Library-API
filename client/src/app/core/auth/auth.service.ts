import { Injectable } from '@angular/core';
import { IUserForLogin, IUserForRegister } from 'src/app/shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    private token: string = '';

    constructor(private http: HttpClient) { }

    public register(user: IUserForRegister): Observable<IUserForRegister> {
        return this.http.post<IUserForRegister>('api/auth/register', user);
    }

    public login(user: IUserForLogin): Observable<{token: string}> {
        return this.http.post<{token: string}>('/api/auth/login', user)
            .pipe(
                tap(({token}) => {
                    localStorage.setItem('auth-token', token);
                    this.setToken(token);
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
}
