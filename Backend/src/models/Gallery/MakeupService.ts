import { MakeupCategory } from "./MakeupCategory"
import { MakeupSubcategory } from "./MakeupSubCategory"
import { Tag } from "./Tag"

export class MakeupService {
    id!: string
    name: string
    price: number
    imageURL: string
    description: String
    category: MakeupCategory
    subCategories: MakeupSubcategory[]
    tags: Tag[]


    constructor(name: string, price: number, imageURL: string,
                description: string, category: MakeupCategory,
                subCategories: MakeupSubcategory[], tags: Tag[]){
        this.name = name
        this.price = price
        this.imageURL = imageURL
        this.description = description
        this.category = category
        this.subCategories = subCategories
        this.tags = tags
    }
}