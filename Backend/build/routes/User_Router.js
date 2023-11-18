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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_1 = require("../data");
const Mongo_Users_1 = require("../models/Database/Mongo_Users");
const SingletonDAO_1 = require("../models/Database/SingletonDAO");
const http_status_1 = require("../constants/http_status");
const UserView_1 = require("../views/UserView");
const router = (0, express_1.Router)();
const userView = new UserView_1.UserView();
//Seed, carga datos de  usuarios cuando la base de datos está vacía
router.get("/seed", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    SingletonDAO_1.SingletonDAO.getInstance().setAccessDAO(new Mongo_Users_1.Mongo_Users());
    SingletonDAO_1.SingletonDAO.getInstance().dbConnect();
    const makeupsCount = yield Mongo_Users_1.Mongo_User_Model.countDocuments();
    if (makeupsCount > 0) {
        res.send("Seed is already done");
    }
    else {
        yield Mongo_Users_1.Mongo_User_Model.create(data_1.sample_users);
        res.send("Seed is done");
    }
    SingletonDAO_1.SingletonDAO.getInstance().dbDisconnect();
})));
// Login
router.post("/login", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userView.login(_req);
    //Revisar si se encontró al usuario
    if (user) {
        console.log("Usuario encontrado");
        res.send(generateTokenResponse(user));
    }
    else {
        res.status(http_status_1.HTTP_BAD_REQUEST).send("Email o contraseña incorrectos");
    }
})));
// Registrar usuario
router.post("/register", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, dbUser } = yield userView.register(_req);
    //Revisar si ya hay un usuario con ese email
    if (user) {
        console.log("Ya existe un usuario con ese email");
        res.status(http_status_1.HTTP_BAD_REQUEST).send("Ya existe un usuario con ese email");
    }
    else {
        console.log("Usuario creado");
        res.send(generateTokenResponse(dbUser));
    }
})));
//Genera un token para el usuario
const generateTokenResponse = (user) => {
    console.log(user);
    const token = jsonwebtoken_1.default.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, "randomstring", { expiresIn: "30d" });
    user.token = token;
    return user;
};
exports.default = router;
