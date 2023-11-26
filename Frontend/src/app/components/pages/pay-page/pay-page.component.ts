import { Component, ElementRef, ViewChild } from '@angular/core';
// import { config } from '../../../../../../Backend/src/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/shared/models/Order';
import { ShopService } from 'src/app/services/shop.service';
import { ShoppingCart } from 'src/shared/models/ShoppingCart';
import { User } from 'src/shared/models/User';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { ICreateOrder } from 'src/interfaces/ICreateOrder';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css']
})
export class PayPageComponent {
  @ViewChild('fileInput') fileInput: ElementRef = new ElementRef('');
  image: File = new File([""], "")
  //totalPrice: number = 0;
  provincia!: string ;
  canton: string = ""
  distrito: string = ""
  detalles: string = ""
  telefono: number = 0
  cart!: ShoppingCart;
  user!:User
  returnURL = '/shop'

  constructor(private shopService:ShopService, private userService:UserService, private cartService: CartService,
    private activatedRoute:ActivatedRoute,  private router:Router) {

      userService.userObservable.subscribe((newUser:User) => {
        this.user = newUser
      })
  
      let cartObservable:Observable<ShoppingCart>
      cartObservable = cartService.getCartByUserId(this.user.id)
  
      cartObservable.subscribe((serverCart) => {
        this.cart = serverCart
      })
    }


  addOrder(){
    this.submitOrder()
    // this.shopService
  }
  submitOrder(){
    // this.isSubmitted = true
    // if(this.newMakeupForm.invalid) return


    const formData = new FormData();
    formData.append('image', this.image);


    const orderData:ICreateOrder = {
      clientId: this.user.id,
      cartId: this.cart.id,
      provincia: this.provincia,
      canton: this.canton,
      distrito: this.distrito,
      detalles: this.detalles,
      telefono: this.telefono
    }

    formData.append('data', JSON.stringify(orderData));
    alert(formData.get('data'))

    this.cartService.createOrder(orderData).subscribe((newOrder) => {
      // alert('Orden creada')
      // this.router.navigateByUrl(this.returnURL)
    })
      
  }


  // Se encarga de cambiar el valor de la variable imageFile cuando se selecciona un archivo
  imageFileChange(event:any) {
  // Obtiene el archivo seleccionado
    const file:File = event.target.files[0];
     this.image = file
  }  
  
} 
