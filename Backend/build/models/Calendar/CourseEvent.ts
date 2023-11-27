import { BaseDecoratorEvents } from "./BaseDecoratorEvents";
import { CalendarEvent } from "./CalendarEvent";

export class CourseEvent extends BaseDecoratorEvents {
    constructor(event: CalendarEvent, id: number, title: string, start:Date, end: Date){
        super(event, id, title, start, end);
        this.color = 'green'
        this.type = 'Curso';
    }
}