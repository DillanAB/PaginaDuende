import { Mongo_Notification, Mongo_Notification_Model } from "../models/Database/Mongo_Notification"
import { SingletonDAO } from "../models/Database/SingletonDAO"


export class AdminNotifications {

    async getNotifications(userId: string) {
        SingletonDAO.getInstance().setAccessDAO(new Mongo_Notification())
        SingletonDAO.getInstance().dbConnect()
        const notifications = await Mongo_Notification_Model.find({ userId: userId })

        SingletonDAO.getInstance().dbDisconnect()
        return notifications
    }
}