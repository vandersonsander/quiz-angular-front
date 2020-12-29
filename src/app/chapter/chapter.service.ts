import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Chapter } from './chapter';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Code ${error.status}, ` +
        `Message: ${error.error}`);
    }
    return throwError(
      'An error occurred please try again later.');
  }

  index(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${environment.urlConfig.baseUrl}/chapter`)
    .pipe(
      catchError(this.handleError)
    );
  }

  show(id: number): Observable<Chapter> {
    return this.http
      .get<Chapter>(`${environment.urlConfig.baseUrl}/chapter/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  store(chapter: Chapter): Observable<Chapter> {
    return this.http
      .post<Chapter>
        (`${environment.urlConfig.baseUrl}/chapter`, chapter);
  }

  update(id: number, chapter: Chapter): Observable<Chapter> {
    return this.http
      .put<Chapter>
        (`${environment.urlConfig.baseUrl}/chapter/${id}`, chapter);
  }

  destroy(id: number): void {
    this.http.delete(`${environment.urlConfig.baseUrl}/chapter/${id}`);
  }
}
