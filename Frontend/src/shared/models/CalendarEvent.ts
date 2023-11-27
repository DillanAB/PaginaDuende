export interface CalendarEvent{
    getId() : number;
    getStart() : string;
    getEnd() : string;
    getType() : string;
    setTitle(title:string) : void;
    setStart(start:string) : void;
    setEnd(end:string) : void;
}