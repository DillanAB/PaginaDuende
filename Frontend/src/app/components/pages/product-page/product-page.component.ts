import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { CartDetail } from 'src/shared/models/CartDetail';
import { Product } from 'src/shared/models/Product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  product!: Product;
  quantity: number = 1;
  constructor(shopService:ShopService, activatedRoute: ActivatedRoute, private cartService:CartService, private router:Router){
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

  addToCart(quantity: number){
    this.cartService.addToCart(new CartDetail(this.product, quantity));
    this.router.navigateByUrl('/cart-page');
  }
}
