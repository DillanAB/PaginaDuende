"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo_Tag_Model = exports.Mongo_Tag_Schema = exports.Mongo_Tag = void 0;
const mongoose_1 = require("mongoose");
const DAO_Mongo_1 = require("./DAO_Mongo");
class Mongo_Tag extends DAO_Mongo_1.DAO_Mongo {
    constructor() {
        super();
    }
}
exports.Mongo_Tag = Mongo_Tag;
exports.Mongo_Tag_Schema = new mongoose_1.Schema({ name: { type: String, required: true } }, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
exports.Mongo_Tag_Model = (0, mongoose_1.model)('Tag', exports.Mongo_Tag_Schema);
