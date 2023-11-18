import { User } from "./User";

export class FactoryUser {
    public create(name:string, email:string, password:string, isAdmin:boolean): User {
        return new User(name, email.toLowerCase(), password, isAdmin);
    }
}