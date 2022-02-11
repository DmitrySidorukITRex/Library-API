import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AboutUsService {
  constructor(private readonly http: HttpClient) {}

  public getAllVideos(): Observable<any> {
    return this.http.get<any>('api/about-us');
  }
}
