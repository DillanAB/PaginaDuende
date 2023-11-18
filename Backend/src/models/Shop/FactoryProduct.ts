import { Product } from "./Product"

export class FactoryProduct {
    public create(jsonProduct:any): Product{
        const {name, description, price, imageURL, availibility, category, subcategory} = jsonProduct
        return new Product(name, price, imageURL, availibility, description, category, subcategory)
    }
}