import { User } from "./User";

export class Client extends User{
    constructor(){
        super();
        this.id = 1;
        this.name = "Client";
        this.email = "";
        this.password = "";
        this.token = "";
        this.isAdmin = false;
    }
}