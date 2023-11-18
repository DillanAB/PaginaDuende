"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo_MakeupSubCategory_Model = exports.Mongo_MakeupSubCategory_Schema = exports.Mongo_MakeupSubCategory = void 0;
const mongoose_1 = require("mongoose");
const DAO_Mongo_1 = require("./DAO_Mongo");
class Mongo_MakeupSubCategory extends DAO_Mongo_1.DAO_Mongo {
    constructor() {
        super();
    }
}
exports.Mongo_MakeupSubCategory = Mongo_MakeupSubCategory;
exports.Mongo_MakeupSubCategory_Schema = new mongoose_1.Schema({
    name: { type: String, required: true }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
exports.Mongo_MakeupSubCategory_Model = (0, mongoose_1.model)('MakeupSubCategory', exports.Mongo_MakeupSubCategory_Schema);
