import { BuyDetail } from "./BuyDetail";
import { Product } from "./Product";

export class CartDetail{
    productId!: string;
    productPrice!: number;
    productName!: string;
    quantity!: number;
    price!: number;
    productImageURL!: string;
    productAvailability!: boolean

    constructor(productId: string, productName:string, productPrice: number, quantity: number,
        productImageURL: string, productAvailability: boolean){
        // super(id, product, quantity);
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.price = productPrice * quantity;
        this.productImageURL = productImageURL;
        this.productAvailability = productAvailability;
    }
    getPrice(){ return this.price }
} 