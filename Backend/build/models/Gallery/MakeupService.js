"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeupService = void 0;
class MakeupService {
    constructor(name, price, imageURL, description, category, subCategories, tags) {
        this.name = name;
        this.price = price;
        this.imageURL = imageURL;
        this.description = description;
        this.category = category;
        this.subCategories = subCategories;
        this.tags = tags;
    }
}
exports.MakeupService = MakeupService;
