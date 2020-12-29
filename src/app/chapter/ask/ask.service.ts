import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ask } from './ask';

@Injectable({
  providedIn: 'root'
})

export class AskService {
  emmitSelectedAsk = new EventEmitter<number>();
  currentAsk: number = 0;

  constructor(private http: HttpClient) { }

  getCurrentAsk():number {
    return this.currentAsk;
  }

  selectAsk(askIndex: number) {
    this.currentAsk = askIndex;
    this.emmitSelectedAsk.emit(this.currentAsk);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Code ${error.status},
        Message: ${error.error}`);
    }
    return throwError(
      'An error occurred please try again later.');
  }

  index(): Observable<Ask[]> {
    return this.http.get<Ask[]>(`${environment.urlConfig.baseUrl}/ask`);
  }

  show(id: number): Observable<Ask> {
    return this.http
      .get<Ask>(`${environment.urlConfig.baseUrl}/ask/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  store(ask: Ask): Observable<Ask> {
    return this.http
      .post<Ask>
        (`${environment.urlConfig.baseUrl}/ask`, ask)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: number, ask: Ask): Observable<Ask> {
    return this.http
      .put<Ask>
        (`${environment.urlConfig.baseUrl}/ask/${id}`, ask)
      .pipe(
        catchError(this.handleError)
      );
  }

  destroy(id: number): void {
    this.http.delete(`${environment.urlConfig.baseUrl}/ask/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }
}
