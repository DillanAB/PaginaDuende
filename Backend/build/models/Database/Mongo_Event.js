"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo_Event_Model = exports.Mongo_Event_Schema = exports.Mongo_Event = void 0;
const mongoose_1 = require("mongoose");
const DAO_Mongo_1 = require("./DAO_Mongo");
const config_1 = require("../../config");
class Mongo_Event extends DAO_Mongo_1.DAO_Mongo {
    constructor() {
        super();
    }
}
exports.Mongo_Event = Mongo_Event;
exports.Mongo_Event_Schema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    color: { type: String, required: true },
    type: [{ type: String, required: true }]
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true,
});
exports.Mongo_Event_Model = (0, mongoose_1.model)('Event', exports.Mongo_Event_Schema);
