import { Constants } from './../shared/utils/constants';
import { TaxesForm } from './../models/taxes-form';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private http: HttpClient) {}

  payTaxes(body: TaxesForm): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + '/' + Constants.ROOTS_TAXES, body);
  }
}
