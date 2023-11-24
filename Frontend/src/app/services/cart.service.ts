import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartDetail } from 'src/shared/models/CartDetail';
import { Client } from 'src/shared/models/Client';
import { Order } from 'src/shared/models/Order';
import { Product } from 'src/shared/models/Product';
import { ShoppingCart } from 'src/shared/models/ShoppingCart';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private shoppingCart: ShoppingCart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<ShoppingCart> = new BehaviorSubject(this.shoppingCart);
  
  constructor(private shopService: ShopService) { 
    //this.clearCart();
  }

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

  editDetailNum(detailID:number, num: number) {
    let cartDetailSelected = this.shoppingCart.products.find(cartDet => cartDet.id === detailID);
    if (!cartDetailSelected)
      return;
    cartDetailSelected.quantity = num;
    cartDetailSelected.price = num * cartDetailSelected.product.price;
    this.setCartToLocalStorage();
  }

  deleteCartDetail(detailID:number) {
    this.shoppingCart.products = this.shoppingCart.products.filter(cartDetail => cartDetail.id != detailID)
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.shoppingCart.reset();
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

  buyCart(): void {
    this.shopService.buyCart(this.shoppingCart);
  }

}
