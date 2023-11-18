"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(pName, pPrice, image, pAvailability, pDescription, pCategory, pSubCategories) {
        this.name = pName;
        this.price = pPrice;
        this.imageURL = image;
        this.availability = pAvailability;
        this.description = pDescription;
        this.category = pCategory;
        this.subCategories = pSubCategories;
    }
}
exports.Product = Product;
