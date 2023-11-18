"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo_User_Model = exports.Mongo_User_Schema = exports.Mongo_Users = void 0;
const mongoose_1 = require("mongoose");
const DAO_Mongo_1 = require("./DAO_Mongo");
class Mongo_Users extends DAO_Mongo_1.DAO_Mongo {
    constructor() {
        super();
    }
}
exports.Mongo_Users = Mongo_Users;
exports.Mongo_User_Schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
exports.Mongo_User_Model = (0, mongoose_1.model)('User', exports.Mongo_User_Schema);
