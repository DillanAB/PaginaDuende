import { Product } from "./Product";

export class BuyDetail{
    productId!: string;
    productName!: string;
    productPrice!: number;
    quantity!: number;
    price!: number;
    productImageURL!: string;

    constructor(product: Product, quantity: number){
        this.productId = product.id;
        this.productName = product.name;
        this.productPrice = product.price;
        this.quantity = quantity;
        this.price = product.price * quantity;
        this.productImageURL = product.imageURL;
    }
}