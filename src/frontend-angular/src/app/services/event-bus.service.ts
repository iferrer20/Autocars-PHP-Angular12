import { EventData } from './../classes/eventData';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { pipe, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject = new Subject();

  emit(eventName: string, data: any) : void {
    let eventData = {name: eventName, data: data};
    this.subject.next(eventData);
  }

  on(eventName: string, action: any) : void {
    this.subject.pipe(
      filter<any>((e: EventData) => e.name === eventName),
      map((e: EventData) => e.data)
    ).subscribe(action);

  }

  constructor() { }
}
