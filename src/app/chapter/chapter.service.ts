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
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Code ${error.status}, ` +
        `Message: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'An error occurred please try again later.');
  }

  index(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${environment.urlConfig.baseUrl}/chapter`);
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
        (`${environment.urlConfig.baseUrl}/chapter`, chapter)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: number, chapter: Chapter): Observable<Chapter> {
    return this.http
      .put<Chapter>
        (`${environment.urlConfig.baseUrl}/chapter/${id}`, chapter)
      .pipe(
        catchError(this.handleError)
      );
  }

  destroy(id: number): void {
    this.http.delete(`${environment.urlConfig.baseUrl}/chapter/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }
}
