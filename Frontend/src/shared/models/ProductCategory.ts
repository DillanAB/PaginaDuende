import { Category } from "./Category";
import { ProductSubcategory } from "./ProductSubCategory";

export class ProductCategory extends Category {
    subcategories: ProductSubcategory[];

    constructor(pId:string, pName: string, pSubcategories: ProductSubcategory[]) {
        super(pId, pName);
        this.subcategories = pSubcategories;
    }
}