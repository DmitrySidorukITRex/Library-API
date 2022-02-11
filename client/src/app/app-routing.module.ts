import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { SiteLayoutComponent } from './core/site-layout/site-layout.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { UsersComponent } from './pages/users/users.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FilmsComponent } from './pages/films/films.component';
import { FilmDetailsComponent } from './pages/films/film-details/film-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'books', component: BooksComponent },
      { path: 'users', component: UsersComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'about-us', component: AboutUsComponent },
      {
        path: 'films',
        component: FilmsComponent,
      },
      { path: 'films/:id', component: FilmDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
