import { BaseDecoratorEvents } from "./BaseDecoratorEvents";
import { CalendarEvent } from "./CalendarEvent";

export class MakeupEvent extends BaseDecoratorEvents {
    constructor(event: CalendarEvent, id: number, title: string, start:Date, end: Date){
        super(event, id, title, start, end);
        this.color = 'cornflowerblue'
        this.type = 'Maquillaje';
    }
}