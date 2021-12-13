import { Constants } from './../shared/utils/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location';
import { DayWithSlot } from '../models/day-with-slot';
import { DayWithSlots } from '../models/day-with-slots';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) {}


  

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(environment.apiUrl + '/' + Constants.ROOTS_LOCATIONS);
  }

  getSlotsByLocationId(locationId: string): Observable<DayWithSlots[]> {
    return this.http.get<DayWithSlots[]>(environment.apiUrl + '/' + Constants.ROOTS_SLOTS + '/' + locationId);
  }

  scheduleAppointment(dayWithSlot: DayWithSlot): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + '/' + Constants.ROOTS_SCHEDULE_APPOINTMENT, dayWithSlot);
  }
}
