import { Product } from "./Product";

export class BuyDetail{
    id!: string;
    product!: Product;
    quantity!: number;
    price!: number;

    constructor(product: Product, quantity: number){
        this.id = product.id;
        this.product = product;
        this.quantity = quantity;
        this.price = product.price * quantity;
    }
}