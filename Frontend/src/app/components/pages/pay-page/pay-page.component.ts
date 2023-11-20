import { Component } from '@angular/core';
import { config } from '../../../../../../Backend/src/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/shared/models/Order';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.css']
})
export class PayPageComponent {
  //totalPrice: number = 0;
  provincia!: number ;
  canton!: number;
  distrito!: number;
  detalles!: number;	
  telefono!: number;
  image!: File;

  constructor(private shopService:ShopService,
    private activatedRoute:ActivatedRoute,
    private router:Router) {
    }


  addOrder(){
    this.shopService
  }
} 
