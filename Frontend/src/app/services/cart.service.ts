import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAddToCart } from 'src/interfaces/IAddToCart';
import { ICreateOrder } from 'src/interfaces/ICreateOrder';
import { CART_ADDTOCART_URL, CART_BY_USERID_URL, CART_CREATEORDER_URL } from 'src/shared/constants/urls';
import { CartDetail } from 'src/shared/models/CartDetail';
import { Client } from 'src/shared/models/Client';
import { Order } from 'src/shared/models/Order';
import { Product } from 'src/shared/models/Product';
import { ShoppingCart } from 'src/shared/models/ShoppingCart';

const CART_KEY = 'Cart'

@Injectable({
  providedIn: 'root'
})
export class CartService {  
  constructor(private http:HttpClient) { 
  }

  createOrderDetail(product: Product, num: number){

  }

  // createOrder(client: Client, address: string){
    
  // }

  //Obtiene el carrito de compras que le corresponde al usuario
  getCartByUserId(userId:string):Observable<ShoppingCart>{
    return this.http.get<ShoppingCart>(CART_BY_USERID_URL + userId)
  }

  //Agrega un producto al carrito de compras
  addToCart(addData:IAddToCart):Observable<ShoppingCart>{
    return this.http.post<ShoppingCart>(CART_ADDTOCART_URL, addData)
  }

  //Crea una orden de compra
  createOrder(formData:ICreateOrder):Observable<ShoppingCart>{
    return this.http.post<ShoppingCart>(CART_CREATEORDER_URL, formData)
  }


  // addToCart(cartDetail: CartDetail): void {
  //   let cartItem = this.shoppingCart.details.find(item => item.id === cartDetail.id);
  //   if (cartItem)
  //     return;
    
  //   try {this.shoppingCart.addCartDetail(cartDetail);}
  //   catch (err) {alert(err)}

  //   this.setCartToLocalStorage();
  // }

  // editDetailNum(detailID:number, num: number) {
  //   let cartDetailSelected = this.cartObservable.details.find(cartDet => cartDet.id === detailID);
  //   if (!cartDetailSelected)
  //     return;
  //   cartDetailSelected.quantity = num;
  //   cartDetailSelected.price = num * cartDetailSelected.product.price;
  //   // this.setCartToLocalStorage();
  // }

  // deleteCartDetail(detailID:number) {
  //   this.shoppingCart.details = this.shoppingCart.details.filter(cartDetail => cartDetail.id != detailID)
  //   // this.setCartToLocalStorage();
  // }

  // clearCart(){
  //   this.shoppingCart.reset();
  //   localStorage.clear();
  // }

  getCartData(): string {
    return "";
  }

  setOrderAddress(address:string){

  }

  displayReceiptForm(){

  }

  setOrderReceipt(receipt: Order){

  }
}
