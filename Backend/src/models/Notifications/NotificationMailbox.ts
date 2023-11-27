import { Mongo_Notification_Model } from "../Database/Mongo_Notification";
import { Observer } from "./Observer";

export class NotificationMailbox implements Observer {
  userId:string;


  constructor(userId:string) {
    this.userId = userId;
  }
  //Agrega una notificación
  async notify(message: string): Promise<void> {
    await Mongo_Notification_Model.create({userId: this.userId, message: message, readed: false})
  }
}