import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  user!:User
  cartQuantity=0;
  constructor(private userService:UserService, cartService:CartService){

    // cartService.getCartObservable().subscribe((newCart) => {
    //   this.cartQuantity = newCart.getProductsNum();
    // })

    userService.userObservable.subscribe((newUser:User) => {
      this.user = newUser
    })
  }

  logout(){
    this.userService.logout()
  }

  get isAuth(){
    return this.user.token
  }

  //método para usar un alert de prueba al presionar el botón Duende
  a(){
    alert(this.user.isAdmin)
  }

  ngOnInit(): void {
    
  }
}

