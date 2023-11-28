import { BaseDecoratorEvents } from "./BaseDecoratorEvents";
import { CalendarEvent } from "./CalendarEvent";

export class MakeupEvent extends BaseDecoratorEvents {
    constructor(id: number, title: string, start:string, end: string, details:string){
        super(id, title, start, end, details);
        this.color = 'cornflowerblue'
        this.type = 'Maquillaje';
    }
}