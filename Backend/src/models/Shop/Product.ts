import { ProductCategory } from "./ProductCategory"
import { ProductSubcategory } from "./ProductSubCategory"

export class Product {
    id!: number
    name: string
    price: number
    imageURL: string
    availability: boolean
    description: String
    category: ProductCategory
    subCategories: ProductSubcategory[]


    constructor(pName: string, pPrice: number, image: string, pAvailability: boolean,
            pDescription: string, pCategory: ProductCategory, pSubCategories: ProductSubcategory[]){
        this.name = pName
        this.price = pPrice
        this.imageURL = image
        this.availability = pAvailability
        this.description = pDescription
        this.category = pCategory
        this.subCategories = pSubCategories
    }
}