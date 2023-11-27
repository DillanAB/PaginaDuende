"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarView = void 0;
const View_1 = require("./View");
const MainController_1 = require("../controllers/MainController");
class CalendarView extends View_1.View {
    constructor() {
        super();
    }
    //Obtiene todos los maquillajes de la base de datos
    getEvents() {
        return (new MainController_1.MainController().getMakeups());
    }
}
exports.CalendarView = CalendarView;
