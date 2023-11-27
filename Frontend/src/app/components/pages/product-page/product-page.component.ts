import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { UserService } from 'src/app/services/user.service';
import { IAddToCart } from 'src/interfaces/IAddToCart';
import { CartDetail } from 'src/shared/models/CartDetail';
import { Product } from 'src/shared/models/Product';
import { ShoppingCart } from 'src/shared/models/ShoppingCart';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  quantity: number = 1;
  cart!: ShoppingCart;
  user!:User
  constructor(userService:UserService, shopService:ShopService, activatedRoute: ActivatedRoute, 
    private cartService:CartService, private router:Router){
      
    userService.userObservable.subscribe((newUser:User) => {
      this.user = newUser
    })

    let cartObservable:Observable<ShoppingCart>
    cartObservable = cartService.getCartByUserId(this.user.id)

    cartObservable.subscribe((serverCart) => {
      this.cart = serverCart
    })

    let productObservable:Observable<Product>
    activatedRoute.params.subscribe((params) => {
      if(params.id){
        productObservable = shopService.getProductById(params.id)
      }
      
      productObservable.subscribe((serverServices) => {
        this.product = serverServices
      })
      
    })
  }
  ngOnInit(): void {}

  //Agrega un producto al carrito de compras
  addToCart(){
    const addData:IAddToCart = {
      productId: this.product.id,
      quantity: this.quantity,
      // price: this.product.price,
      cartId: this.cart.id
    }
    
    this.cartService.addToCart(addData).subscribe((cart) => {
    });
    alert("Producto agregado al carrito")
    // this.router.navigateByUrl('/cart-page');
  }

  pr(){
    alert(this.cart)
  }
}
