export class NNotification {
    id: string;
    userId: string;
    message: string;
    read: boolean;
    date: Date;

    constructor(id:string, userId:string, message:string, read:boolean, date:Date) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.read = read;
        this.date = date;
    }
}