import { CartDetail } from "./CartDetail";
import { Client } from "../Users/Client";

export class ShoppingCart{
    id!: number;
    client!: Client;
    products: CartDetail[] = [];

    constructor(cartJson: string){
        if(cartJson != ''){
            const cart = JSON.parse(cartJson);
            this.id = cart.id;
            this.client = cart.client;
            this.products = cart.products;
        }
    }

    // FALTA IMPLEMENTACION

    addCartDetail(cartDetail:CartDetail){
        this.products.push(cartDetail);
    }

    deleteCartDetail(id:number){
        this.products = this.products.filter(item => item.id != id);
    }

    getTotalPrice():number{
        var total:number = 0;
        for(var i:number=0; i<this.products.length; i++){
            total += this.products[i].price;
        }
        return total;
    }

    getProductsNum():number{
        var total:number = 0;
        for(var i:number=0; i<this.products.length; i++){
            total += this.products[i].quantity;
        }
        return total;
    }

    reset(){
        this.products = [];
    }

    getCartData():string{
        return "";
    }
}