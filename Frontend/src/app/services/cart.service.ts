import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartDetail } from 'src/shared/models/CartDetail';
import { Client } from 'src/shared/models/Client';
import { Order } from 'src/shared/models/Order';
import { Product } from 'src/shared/models/Product';
import { ShoppingCart } from 'src/shared/models/ShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private shoppingCart: ShoppingCart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<ShoppingCart> = new BehaviorSubject(this.shoppingCart);
  
  constructor() { }

  createOrderDetail(product: Product, num: number){

  }

  createOrder(client: Client, address: string){
    
  }

  addToCart(cartDetail: CartDetail): void {
    let cartItem = this.shoppingCart.products.find(item => item.id === cartDetail.id);
    if (cartItem)
      return;
    
    try {this.shoppingCart.addCartDetail(cartDetail);}
    catch (err) {alert(err)}

    this.setCartToLocalStorage();
  }

  editDetailNum(detailID:string, num: number) {
    let cartDetailSelected = this.shoppingCart.products.find(cartDet => cartDet.id === detailID);
    if (!cartDetailSelected)
      return;
    cartDetailSelected.quantity = num;
    cartDetailSelected.price = num * cartDetailSelected.product.price;
    this.setCartToLocalStorage();
  }

  deleteCartDetail(detailID:string) {
    this.shoppingCart.products = this.shoppingCart.products.filter(cartDetail => cartDetail.id != detailID)
    this.setCartToLocalStorage();
  }

  clearCart(){
    localStorage.clear();
  }

  getCartData(): string {
    return "";
  }

  setOrderAddress(address:string){

  }

  displayReceiptForm(){

  }

  setOrderReceipt(receipt: Order){

  }

  // AGREGADOS

  getCartObservable(): Observable<ShoppingCart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void {
    this.shoppingCart.id = 1 //////////////////////////// ARREGLAR
    this.shoppingCart.client = new Client()//////////////////////////// ARREGLAR
    const cartJson = JSON.stringify(this.shoppingCart);
    localStorage.setItem('shoppingCart', cartJson);
    this.cartSubject.next(this.shoppingCart)
  }

  private getCartFromLocalStorage():ShoppingCart{
    const cartJson = localStorage.getItem('shoppingCart') ;
    return cartJson? new ShoppingCart(cartJson): new ShoppingCart('');
  }

}
