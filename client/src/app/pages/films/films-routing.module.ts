import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmsComponent } from './films.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsComponent,
  },
  {
    path: ':id',
    component: FilmDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsRoutingModule {}
