import { Constants } from './../shared/utils/constants';
import { MovementsMetadata } from './../models/movements-metadata';
import { CardForm } from './../models/card-form';
import { Card } from './../models/card';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.apiUrl + '/' + Constants.ROOTS_CARDS);
  }

  addCard(cardForm: CardForm): Observable<Card> {
    return this.http.post<Card>(environment.apiUrl + '/' + Constants.ROOTS_CARDS, cardForm);
  }

  deleteCardById(cardId: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + '/' + Constants.ROOTS_CARDS + '/' + cardId);
  }

  getMovementsByCardId(cardId: string, offset: number, limit: number): Observable<MovementsMetadata> {

    let params = new HttpParams()
    .set("offset", offset).
     set("limit", limit); 

    return this.http.get<MovementsMetadata>(environment.apiUrl + '/' + Constants.ROOTS_CARDS +
                                            '/' + cardId +  '/' + Constants.ROOTS_MOVEMENTS, { params: params });
  }

}


