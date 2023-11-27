import { BaseDecoratorEvents } from "./BaseDecoratorEvents";
import { CalendarEvent } from "./CalendarEvent";

export class CourseEvent extends BaseDecoratorEvents {
    constructor(id: number, title: string, start:string, end: string){
        super(id, title, start, end);
        this.color = 'green'
        this.type = 'Curso';
    }
}