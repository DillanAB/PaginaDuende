import { ProductCategory } from "./ProductCategory"
import { ProductSubcategory } from "./ProductSubCategory"

export class Product {
    id: number
    name: string
    price: number
    imageURL: string
    availability: number
    description: String
    category: ProductCategory
    subCategories: ProductSubcategory[]


    constructor(pId: number, pName: string, pPrice: number, pImageUrl: string, pAvailability: number,
            pDescription: string, pCategory: ProductCategory, pSubCategories: ProductSubcategory[]){
        this.id = pId
        this.name = pName
        this.price = pPrice
        this.imageURL = pImageUrl
        this.availability = pAvailability
        this.description = pDescription
        this.category = pCategory
        this.subCategories = pSubCategories
    }
}