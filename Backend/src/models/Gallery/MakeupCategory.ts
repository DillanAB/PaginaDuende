//import { MakeupSubcategory } from "./MakeupSubcategory";
import { Category } from "../Category";
import { MakeupSubcategory } from "./MakeupSubCategory";

export class MakeupCategory extends Category {
    subcategories: MakeupSubcategory[]

    constructor(name:string, subcategories:MakeupSubcategory[]) {
        super(name);
        this.subcategories = subcategories;
    }
}