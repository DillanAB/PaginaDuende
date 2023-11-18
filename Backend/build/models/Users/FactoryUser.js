"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryUser = void 0;
const User_1 = require("./User");
class FactoryUser {
    create(name, email, password, isAdmin) {
        return new User_1.User(name, email.toLowerCase(), password, isAdmin);
    }
}
exports.FactoryUser = FactoryUser;
