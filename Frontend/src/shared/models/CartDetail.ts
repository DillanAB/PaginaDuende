import { BuyDetail } from "./BuyDetail";
import { Product } from "./Product";

export class CartDetail extends BuyDetail{

    constructor(product: Product, quantity: number){
        super(product, quantity);
    }
    getPrice(){ return this.price }
}