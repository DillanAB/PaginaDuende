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
exports.AdminUser = void 0;
const Mongo_Users_1 = require("../models/Database/Mongo_Users");
const SingletonDAO_1 = require("../models/Database/SingletonDAO");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const FactoryUser_1 = require("../models/Users/FactoryUser");
//Controlador de usuarios
class AdminUser {
    constructor() { }
    //Iniciar sesión
    login(jsonUser) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Users_1.Mongo_Users());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const { email, password } = jsonUser;
            const user = yield Mongo_Users_1.Mongo_User_Model.findOne({ email, password });
            SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
            return user;
        });
    }
    //Registrar usuario
    register(jsonUser) {
        return __awaiter(this, void 0, void 0, function* () {
            SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Users_1.Mongo_Users());
            SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
            const { email, password, name } = jsonUser;
            const user = yield Mongo_Users_1.Mongo_User_Model.findOne({ email });
            //Revisa si existe un usuario con ese email
            if (user) {
                return { user };
            }
            else {
                const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
                const newUser = new FactoryUser_1.FactoryUser().create(name, email, encryptedPassword, false);
                const dbUser = yield Mongo_Users_1.Mongo_User_Model.create(newUser);
                return { user: null, dbUser };
            }
        });
    }
}
exports.AdminUser = AdminUser;
