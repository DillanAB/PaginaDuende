import { CalendarEvent } from "./CalendarEvent";

export class BaseDecoratorEvents implements CalendarEvent{
    event !: CalendarEvent;
    id !: number;
    title !: string;
    start !: Date;
    end !: Date;
    color !: string;
    type !: string;

    constructor(event: CalendarEvent, id: number, title: string, start:Date, end: Date){
        this.event = event;
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
    }
}