"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAO_Product_Model = exports.DAO_Product_Schema = exports.Mongo_Product = void 0;
const mongoose_1 = require("mongoose");
const DAO_Mongo_1 = require("./DAO_Mongo");
const config_1 = require("../../config");
class Mongo_Product extends DAO_Mongo_1.DAO_Mongo {
    constructor() {
        super();
    }
}
exports.Mongo_Product = Mongo_Product;
exports.DAO_Product_Schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
    subCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'ProductSubCategory', required: true }],
    availability: { type: Boolean, required: true },
    description: { type: String, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true,
});
exports.DAO_Product_Schema.methods.setImageURL = function setImageURL(imageName) {
    const { host, port } = config_1.config.appConfig;
    this.imageURL = `${host}:${port}/public/${imageName}`;
};
exports.DAO_Product_Model = (0, mongoose_1.model)('Product', exports.DAO_Product_Schema);
