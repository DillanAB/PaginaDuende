import { BuyDetail } from "./BuyDetail";
import { Product } from "./Product";

export class OrderDetail extends BuyDetail{
    productBuyPrice!: number;
    constructor(product:Product, quantity: number, productBuyPrice: number){
        super(product, quantity);
        this.productBuyPrice = productBuyPrice;
    }


    getPrice(): number { return this.productBuyPrice; }
}