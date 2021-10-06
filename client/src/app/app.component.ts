import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        const token = localStorage.getItem('auth-token');
        const isAdmin = localStorage.getItem('isAdmin');
        if (token) {
            this.auth.setToken(token);
        }
        if (isAdmin) {
            this.auth.setAdmin(JSON.parse(isAdmin));
        }
    }
}
