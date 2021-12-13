import { Contact } from './../models/contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.apiUrl + '/' + Constants.ROOTS_CONTACTS);
  }

  addContact(partialContact : Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(environment.apiUrl + '/' + Constants.ROOTS_CONTACTS, partialContact);
  }

  updateContact(partialContact : Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(environment.apiUrl + '/' + Constants.ROOTS_CONTACTS + '/' + partialContact._id, partialContact);
  }

  deleteContact(contactId: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + '/' + Constants.ROOTS_CONTACTS + '/' + contactId);
  }


}
