import { MakeupCategory } from "./MakeupCategory"
import { MakeupSubcategory } from "./MakeupSubCategory"
import { Tag } from "./Tag"

export class MakeupService {
    id:string
    name: string
    price: number
    imageURL: string
    description: String
    category: MakeupCategory
    subCategories: MakeupSubcategory[]
    tags: Tag[]


    constructor(pId:string, pName: string, pPrice: number, pImage: string,
            pDescription: string, pCategory: MakeupCategory, pSubCategories: MakeupSubcategory[], pTags: Tag[]){
        this.id = pId
        this.name = pName
        this.price = pPrice
        this.imageURL = pImage
        this.description = pDescription
        this.category = pCategory
        this.subCategories = pSubCategories
        this.tags = pTags
    }
}