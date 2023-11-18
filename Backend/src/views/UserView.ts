// import asyncHandler from "express-async-handler";
import { View } from "./View";

export class UserView extends View {

    constructor() {
        super()
    }

    //Iniciar sesión
    public login(_req:any) {
            const {email, password} = _req.body
            return this.controller.login({email, password})
    }

    public register(_req:any) {
        const {email, password, name} = _req.body
        return (this.controller.register({email, password, name}))
    }

}