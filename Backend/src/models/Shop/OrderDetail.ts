import { BuyDetail } from "./BuyDetail";

export class OrderDetail extends BuyDetail{
    productBuyPrice: number = this.price;

    getPrice(): number { return this.productBuyPrice; }
}