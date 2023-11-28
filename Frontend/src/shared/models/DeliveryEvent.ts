import { BaseDecoratorEvents } from "./BaseDecoratorEvents";
import { CalendarEvent } from "./CalendarEvent";

export class DeliveryEvent extends BaseDecoratorEvents {
    constructor(id: number, title: string, start:string, end: string, details: string) {
        super(id, title, start, end, details);
        this.color = 'red'
        this.type = 'Entrega';
    }
}