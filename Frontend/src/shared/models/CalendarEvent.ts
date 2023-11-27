
export interface CalendarEvent{
    getId() : number;
    getType() : string;
    setTitle(title:string) : void;
    setStart(start:string) : void;
    setEnd(end:string) : void;
}