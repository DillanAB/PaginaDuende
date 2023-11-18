"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeupCategory = void 0;
//import { MakeupSubcategory } from "./MakeupSubcategory";
const Category_1 = require("../Category");
class MakeupCategory extends Category_1.Category {
    constructor(name, subcategories) {
        super(name);
        this.subcategories = subcategories;
    }
}
exports.MakeupCategory = MakeupCategory;
