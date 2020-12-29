import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome`);
  }
}
