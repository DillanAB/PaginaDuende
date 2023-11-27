// import { User } from "../Users/User";
import { CartDetail } from "./CartDetail";


export class ShoppingCart{
    id!: string;
    clientId!: string;
    details: CartDetail[] = [];
    price: number;
    totalQuantity!: number;

    constructor(id: string, clientId:string, details: CartDetail[]){
        this.id = id;
        this.clientId = clientId;
        this.details = details;
        this.price = this.getTotalPrice();
        this.totalQuantity = this.getDetailsNum();
    }

    // FALTA IMPLEMENTACION

    addCartDetail(cartDetail:CartDetail){
        this.details.push(cartDetail);
    }

    deleteCartDetail(id:string){
        this.details = this.details.filter(item => item.productId != id);
    }

    getTotalPrice():number{
        var total:number = 0;
        for(var i:number=0; i<this.details.length; i++){
            total += this.details[i].price;
        }
        return total;
    }

    getDetailsNum():number{
        var total:number = 0;
        for(var i:number=0; i<this.details.length; i++){
            total += this.details[i].quantity;
        }
        return total;
    }

    reset(){
        this.details = [];
    }

    getCartData():string{
        return "";
    }
}