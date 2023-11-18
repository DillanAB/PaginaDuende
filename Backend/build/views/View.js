"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const MainController_1 = require("../controllers/MainController");
class View {
    constructor() {
        this.controller = new MainController_1.MainController();
    }
    getController() {
        return this.controller;
    }
}
exports.View = View;
