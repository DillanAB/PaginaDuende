"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo_ProductSubCategory_Model = exports.Mongo_ProductSubCategory_Schema = exports.Mongo_ProductSubCategory = void 0;
const mongoose_1 = require("mongoose");
const DAO_Mongo_1 = require("./DAO_Mongo");
class Mongo_ProductSubCategory extends DAO_Mongo_1.DAO_Mongo {
    constructor() {
        super();
    }
}
exports.Mongo_ProductSubCategory = Mongo_ProductSubCategory;
exports.Mongo_ProductSubCategory_Schema = new mongoose_1.Schema({
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
exports.Mongo_ProductSubCategory_Model = (0, mongoose_1.model)('ProductSubCategory', exports.Mongo_ProductSubCategory_Schema);
