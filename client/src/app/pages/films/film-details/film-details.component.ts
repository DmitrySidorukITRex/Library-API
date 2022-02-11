import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FilmsService } from '../films.service';

@UntilDestroy()
@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent implements OnInit {
  public filmDetails: any;
  public posterUrl: string;
  public idkp: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly filmsService: FilmsService
  ) {}

  ngOnInit(): void {
    this.idkp = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getFilmDetails(this.idkp);
  }

  get filmSrc(): string {
    return `api/films/${this.idkp}/video`;
  }

  public getListFromArr(arr: string[]): string {
    return arr.join(', ');
  }

  private getFilmDetails(id: string): void {
    this.filmsService
      .getFilmDetailsFromKP(id)
      .pipe(untilDestroyed(this))
      .subscribe((details) => {
        this.posterUrl = 'https:' + details.poster;
        this.filmDetails = details;
      });
  }
}
