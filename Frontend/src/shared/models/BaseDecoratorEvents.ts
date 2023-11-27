import { CalendarEvent } from "./CalendarEvent";

export class BaseDecoratorEvents implements CalendarEvent{
    event !: CalendarEvent;
    id !: number;
    title !: string;
    start !: string;
    end !: string;
    color !: string;
    type !: string;

    constructor(id: number, title: string, start:string, end: string){
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
    }

    
    public getId() : number {
        return this.id;
    }
    
    public getType() : string {
        return this.type;
    }

    public setTitle(title:string) : void {
        this.title = title;
    }

    public setStart(start:string) : void {
        this.start = start;
    }

    public setEnd(end:string) : void {
        this.end = end;
    }
}