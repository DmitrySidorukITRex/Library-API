import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastTypes } from 'src/app/shared/enums/enum';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AddEditFilmComponent } from './add-edit-film/add-edit-film.component';
import { FilmApi } from './films.interface';
import { FilmsService } from './films.service';

@UntilDestroy()
@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsComponent implements OnInit {
  public isAdmin: boolean = false;
  public files: any[] = [];

  public allFilms$: Observable<FilmApi[]>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly dialog: MatDialog,
    private readonly filmsService: FilmsService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getAdmin();
    this.getAllFilms();
  }

  public filmById(index: number, film: FilmApi): string {
    return film.idkp;
  }

  public onAddFilm(): void {
    const dialogRef = this.dialog.open(AddEditFilmComponent, {
      width: '600px',
    });

    this.afterModalClosed(dialogRef, 'created');
  }

  public navigateToDetails(id: string): void {
    this.router.navigate(['/films', id]);
  }

  private afterModalClosed(
    dialogRef: MatDialogRef<any, any>,
    action: string
  ): void {
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(
        (result) => {
          if (result) {
            this.getAllFilms();
            this.toastService.open(`The film has been successfully ${action}.`);
          }
        },
        (err) => this.toastService.open(err.error.message, ToastTypes.Error)
      );
  }

  private getAllFilms(): void {
    this.allFilms$ = this.filmsService.getAllFilms();
  }
}
