"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCalendar = void 0;
const config_1 = require("../config");
const Mongo_Event_1 = require("../models/Database/Mongo_Event");
const SingletonDAO_1 = require("../models/Database/SingletonDAO");
//Controlador de la galería
class AdminCalendar {
    constructor() { }
    //Obtiene todos los maquillajes de la base de datos
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Event_1.Mongo_Event());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const events = yield Mongo_Event_1.Mongo_Event_Model.find();
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return events;
        });
    }
}
exports.AdminCalendar = AdminCalendar;
