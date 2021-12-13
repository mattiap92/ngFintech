import { Constants } from './../shared/utils/constants';
import { MovementsMetadata } from './../models/movements-metadata';
import { CardForm } from './../models/card-form';
import { Card } from './../models/card';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(Constants.ROOTS_CITIES);
  }

}


