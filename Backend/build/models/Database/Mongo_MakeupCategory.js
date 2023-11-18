"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo_MakeupCategory_Model = exports.Mongo_MakeupCategory_Schema = exports.Mongo_MakeupCategory = void 0;
const mongoose_1 = require("mongoose");
const DAO_Mongo_1 = require("./DAO_Mongo");
const Mongo_MakeupSubCategory_1 = require("../Database/Mongo_MakeupSubCategory");
class Mongo_MakeupCategory extends DAO_Mongo_1.DAO_Mongo {
    constructor() {
        super();
    }
}
exports.Mongo_MakeupCategory = Mongo_MakeupCategory;
exports.Mongo_MakeupCategory_Schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    subcategories: [{ type: Mongo_MakeupSubCategory_1.Mongo_MakeupSubCategory_Schema, ref: 'MakeupSubCategory', required: true }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
exports.Mongo_MakeupCategory_Model = (0, mongoose_1.model)('MakeupCategory', exports.Mongo_MakeupCategory_Schema);
