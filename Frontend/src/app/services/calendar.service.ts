import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CALENDAR_ADD_EVENT_URL, CALENDAR_URL } from 'src/shared/constants/urls';
import { CalendarEvent } from 'src/shared/models/CalendarEvent';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http:HttpClient) { }

  getEvents(): Observable<CalendarEvent[]>{
    return this.http.get<CalendarEvent[]>(CALENDAR_URL)
  }

  // addEvent(event: CalendarEvent){
  //   return this.http.post<CalendarEvent>(CALENDAR_ADD_EVENT_URL, event)
  // }

  // editEvent(event: CalendarEvent){
  //   return this.http.post<CalendarEvent>(CALENDAR_ADD_EVENT_URL, event)
  // }

  // deleteEvent(id: number){
  //   return this.http.post<CalendarEvent>(CALENDAR_ADD_EVENT_URL, id)
  // }
}
