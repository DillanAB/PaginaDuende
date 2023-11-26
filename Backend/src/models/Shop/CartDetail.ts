import { BuyDetail } from "./BuyDetail";
import { Product } from "./Product";

export class CartDetail extends BuyDetail{
    productAvailability!: boolean
    constructor(product: Product, quantity: number){
        super(product, quantity);
        this.productAvailability = product.availability;
    }
    getPrice(){ return this.price }
}