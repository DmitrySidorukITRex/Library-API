import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsComponent } from './films.component';
import { FilmsService } from './films.service';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddEditFilmComponent } from './add-edit-film/add-edit-film.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilmsRoutingModule } from './films-routing.module';

@NgModule({
  declarations: [FilmsComponent, FilmDetailsComponent, AddEditFilmComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FilmsRoutingModule,
  ],
  providers: [FilmsService],
})
export class FilmsModule {}