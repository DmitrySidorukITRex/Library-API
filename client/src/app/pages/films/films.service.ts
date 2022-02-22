import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmApi, NewFilm } from './films.interface';

@Injectable()
export class FilmsService {
  private tokenKP = '65c9adfdbdbb247942b322fb72adf9e4';

  constructor(private readonly http: HttpClient) {}

  public getAllFilms(): Observable<FilmApi[]> {
    return this.http.get<FilmApi[]>('api/films');
  }

  public addNewFilm(film: NewFilm): Observable<any> {
    const fd = new FormData();
    fd.append('title', film.title);
    fd.append('idkp', film.idkp);
    fd.append('image', film.poster);
    fd.append('filmName', film.filmName);

    return this.http.post<any>('api/films', fd);
  }

  public uploadPoster(file: FormData): Observable<any> {
    return this.http.post<any>('api/films/poster', file);
  }

  public uploadFilm(file: File, idkp: string): Observable<any> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('idkp', idkp);

    return this.http.post<any>('api/films/film', fd);
  }

  public getFilmDetailsFromKP(id: string): Observable<any> {
    return this.http.get<any>(
      `https://cloud-api.kinopoisk.dev/movies/${id}/token/${this.tokenKP}`,
      {}
    );
  }
}
