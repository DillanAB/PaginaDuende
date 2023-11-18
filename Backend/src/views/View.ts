import { MainController } from "../controllers/MainController";

export abstract class View {
    protected controller:MainController
    constructor() {
        this.controller = new MainController()
    }

    public getController():MainController{
        return this.controller
    }
}