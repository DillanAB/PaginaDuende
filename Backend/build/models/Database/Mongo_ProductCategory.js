"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo_ProductCategory_Model = exports.Mongo_ProductCategory_Schema = exports.Mongo_ProductCategory = void 0;
const mongoose_1 = require("mongoose");
const DAO_Mongo_1 = require("./DAO_Mongo");
const Mongo_ProductSubCategory_1 = require("../Database/Mongo_ProductSubCategory");
class Mongo_ProductCategory extends DAO_Mongo_1.DAO_Mongo {
    constructor() {
        super();
    }
}
exports.Mongo_ProductCategory = Mongo_ProductCategory;
exports.Mongo_ProductCategory_Schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    subcategories: [{ type: Mongo_ProductSubCategory_1.Mongo_ProductSubCategory_Schema, ref: 'ProductSubCategory', required: true }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
exports.Mongo_ProductCategory_Model = (0, mongoose_1.model)('ProductCategory', exports.Mongo_ProductCategory_Schema);
