import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { CartDetail } from 'src/shared/models/CartDetail';
import { ShoppingCart } from 'src/shared/models/ShoppingCart';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: ShoppingCart;
  user!:User
  totalPrice!:number
  totalQuantity:number = 0
  constructor(private userService:UserService, private cartService: CartService, activadedRoute: ActivatedRoute){
    userService.userObservable.subscribe((newUser:User) => {
      this.user = newUser
    })

    let cartObservable:Observable<ShoppingCart>
    cartObservable = cartService.getCartByUserId(this.user.id)

    cartObservable.subscribe((serverCart) => {
      this.cart = serverCart
    })
  }
  ngOnInit(): void {
  }

  getDetails(){
    return this.cart.details
  }

  removeFromCart(cartDetail: CartDetail){
    // this.cartService.deleteCartDetail(cartDetail.id)
  }

  changeQuantity(cartDetail: CartDetail, quantityInString: string){
    const quantity = parseInt(quantityInString);
    // this.cartService.editDetailNum(cartDetail.id, quantity)
  }

  getProductsNum(){
    return this.cart.getProductsNum()
  }
}
