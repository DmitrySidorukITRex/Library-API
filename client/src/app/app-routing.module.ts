import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { AuthGuard } from "./core/auth/auth.guard";
import { LoginComponent } from "./core/auth/login/login.component";
import { RegisterComponent } from "./core/auth/register/register.component";
import { SiteLayoutComponent } from "./core/site-layout/site-layout.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
            { path: 'books', component: BooksComponent },
            { path: 'users', component: UsersComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}