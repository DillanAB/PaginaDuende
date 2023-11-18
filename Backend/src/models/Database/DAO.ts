export abstract class DAO {
    // private username: string;
    // private password: string;
    constructor () {}
    // constructor (pUsername: string, pPassword: string) {
    //     this.username = pUsername;
    //     this.password = pPassword;
    // }

    abstract dbConnect(): void;
    abstract dbDisconnect(): void;
}