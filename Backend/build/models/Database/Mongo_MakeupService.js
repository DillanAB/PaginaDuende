"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongo_MakeupService_Model = exports.Mongo_MakeupService_Schema = exports.Mongo_MakeupService = void 0;
const mongoose_1 = require("mongoose");
const DAO_Mongo_1 = require("./DAO_Mongo");
const config_1 = require("../../config");
class Mongo_MakeupService extends DAO_Mongo_1.DAO_Mongo {
    constructor() {
        super();
    }
}
exports.Mongo_MakeupService = Mongo_MakeupService;
exports.Mongo_MakeupService_Schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'MakeupCategory', required: true },
    subCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'MakeupSubCategory', required: true }],
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Tag', required: true }]
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true,
});
exports.Mongo_MakeupService_Schema.methods.setImageURL = function setImageURL(imageName) {
    const { host, port } = config_1.config.appConfig;
    this.imageURL = `${host}:${port}/public/${imageName}`;
};
exports.Mongo_MakeupService_Model = (0, mongoose_1.model)('MakeupService', exports.Mongo_MakeupService_Schema);
