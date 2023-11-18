"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryProduct = void 0;
const Product_1 = require("./Product");
class FactoryProduct {
    create(jsonProduct) {
        const { name, description, price, imageURL, availibility, category, subcategory } = jsonProduct;
        return new Product_1.Product(name, price, imageURL, availibility, description, category, subcategory);
    }
}
exports.FactoryProduct = FactoryProduct;
