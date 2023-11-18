"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = void 0;
// import asyncHandler from "express-async-handler";
const View_1 = require("./View");
class UserView extends View_1.View {
    constructor() {
        super();
    }
    //Iniciar sesión
    login(_req) {
        const { email, password } = _req.body;
        return this.controller.login({ email, password });
    }
    register(_req) {
        const { email, password, name } = _req.body;
        return (this.controller.register({ email, password, name }));
    }
}
exports.UserView = UserView;
