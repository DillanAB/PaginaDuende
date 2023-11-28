import { MainController } from "../controllers/MainController"
import { View } from "./View"

export class NotificationView extends View{
    constructor(){
        super()
    }

    //Obtiene todas las notificaciones de un usuario
    public getUserNotifications(req:any){
        const userId = req.params.userId
        return (new MainController().getNotifications(userId))
    }
}