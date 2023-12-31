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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = require("../data");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Mongo_Event_1 = require("../models/Database/Mongo_Event");
const SingletonDAO_1 = require("../models/Database/SingletonDAO");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const CalendarView_1 = require("../views/CalendarView");
const router = (0, express_1.Router)();
//Seed, carga datos de los maquillajes cuando la base de datos está vacía
router.get("/seed", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Event_1.Mongo_Event());
    SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
    const eventsCount = yield Mongo_Event_1.Mongo_Event_Model.countDocuments();
    if (eventsCount > 0) {
        res.send("Seed is already done");
    }
    else {
        data_1.sample_Events.forEach((event) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(event);
            yield Mongo_Event_1.Mongo_Event_Model.create(event);
            
        }));
        res.send("Seed is done");
    }
    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
})));

//Muestra todos los servicios de maquillaje
router.get("/", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hola mundo")
    const events = yield (new CalendarView_1.CalendarView().getEvents());
    res.send(events);
})));

exports.default = router;
