import { Mongo_User_Model } from "../models/Database/Mongo_Users";
import { NotificationMailbox } from "../models/Notifications/NotificationMailbox";
import { Observer } from "../models/Notifications/Observer";

export class Notifier {
    observers: Observer[];
    
    constructor() {
        this.observers = [];
    }
    //Agrega un observador
    addObserver(observer: Observer) {
        this.observers.push(observer);
    }
    //Notifica a los observadores
    notifyObservers(message:string) {
        this.observers.forEach((observer) => {
            observer.notify(message);
        });
    }

    async addAdminUsers(){
        const admins = await Mongo_User_Model.find({ isAdmin: true })
        admins.forEach(admin => {
            this.observers.push(new NotificationMailbox(admin.id))
        });
    }

    async notifyNewOrder(){
        console.log("Notificando a los administradores")
        await this.addAdminUsers()
        await this.notifyObservers("Se ha realizado un nuevo pedido")
    }
}