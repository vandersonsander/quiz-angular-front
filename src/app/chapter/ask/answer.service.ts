import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Answer } from './answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

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

  index(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${environment.urlConfig.baseUrl}/answer`)
      .pipe(
        catchError(this.handleError)
      );
  }

  show(id: number): Observable<Answer> {
    return this.http
      .get<Answer>(`${environment.urlConfig.baseUrl}/answer/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  store(answer: Answer): Observable<Answer> {
    return this.http
      .post<Answer>
        (`${environment.urlConfig.baseUrl}/answer`, answer);
  }

  update(id: number, answer: Answer): Observable<Answer> {
    return this.http
      .put<Answer>
        (`${environment.urlConfig.baseUrl}/answer/${id}`, answer);
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${environment.urlConfig.baseUrl}/answer/${id}`);
  }
}
