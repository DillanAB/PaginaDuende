import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartDetail } from 'src/shared/models/CartDetail';
import { ShoppingCart } from 'src/shared/models/ShoppingCart';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!: ShoppingCart;
  constructor(private cartService: CartService){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  getProducts(){
    return this.cart.products
  }

  removeFromCart(cartDetail: CartDetail){
    this.cartService.deleteCartDetail(cartDetail.id)
  }

  changeQuantity(cartDetail: CartDetail, quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.editDetailNum(cartDetail.id, quantity)
  }
}
