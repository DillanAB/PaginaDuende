"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryMakeupService = void 0;
const MakeupService_1 = require("./MakeupService");
class FactoryMakeupService {
    create(jsonMakeupService) {
        const { name, description, price, imageURL, category, subcategory } = jsonMakeupService;
        return new MakeupService_1.MakeupService(name, price, imageURL, description, category, subcategory, []);
    }
}
exports.FactoryMakeupService = FactoryMakeupService;
