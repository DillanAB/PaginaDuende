export class Notification{
    message:string
    readed:boolean
    date: Date

    constructor(message:string){
        this.message = message
        this.readed = false
        this.date = new Date()
    }
}