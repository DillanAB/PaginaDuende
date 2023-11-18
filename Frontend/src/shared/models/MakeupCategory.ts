import { Category } from "./Category";
import { MakeupSubcategory } from "./MakeupSubCategory";

export class MakeupCategory extends Category {
    subcategories: MakeupSubcategory[];

    constructor(pId: string, pName: string, pSubcategories: MakeupSubcategory[]) {
        super(pId, pName);
        this.subcategories = pSubcategories;
    }
}