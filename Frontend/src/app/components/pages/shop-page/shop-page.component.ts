import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { Product } from 'src/shared/models/Product';
import { FooterComponent } from '../../partials/footer/footer.component';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/shared/models/ProductCategory';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/shared/models/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductSubcategory } from 'src/shared/models/ProductSubCategory';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit{
  modelnewProductCategory:ProductCategory = new ProductCategory("","",[])
  modelnewProductSubCategory:ProductSubcategory = new ProductSubcategory("","")
  modelnewSubCategoriesIds:string[] = []
  imageFile:File = new File([""], "")
  control:FormControl = new FormControl('')
  newProductForm!:FormGroup
  isSubmitted = false
  productCats: ProductCategory[] = []
  products: Product[] = [];
  user!:User
  showNewProductForm: boolean = false;
  returnURL = '/shop'

  constructor(private userService:UserService, private shopService: ShopService, activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder, private router:Router) {

    userService.userObservable.subscribe((newUser:User) => {
      this.user = newUser
    })

    let catsObservable:Observable<ProductCategory[]>
    let servicesObservable:Observable<Product[]>
    activatedRoute.params.subscribe((params) => {
      if(params.categoryId){
        //Entra cuando se selecciona una categoría
        servicesObservable = shopService.getProductsByCategory(params.categoryId)
      }else if(params.subcategoryId){
        //Entra cuando se selecciona una subcategoría
        servicesObservable = shopService.getProductsBySubCategory(params.subcategoryId)
      }else{
        //Entra cuando no hay categoría ni subcategoría seleccionada (Página inicial de tienda)
        servicesObservable = shopService.getAll()
      }

      //Siempre obtiene las categorías
      catsObservable = shopService.getAllCats()
        
      servicesObservable.subscribe((serverServices) => {
        this.products = serverServices
      })

      catsObservable.subscribe((serverCats) => {
        this.productCats = serverCats
      })
  })
  }

  showSubcategories:any = null
  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: this.modelnewProductCategory.id,
      subCategories: this.modelnewSubCategoriesIds,
    }
  )
}
  get fc() {
    return this.newProductForm.controls
  }

  setNewProductForm(){
    this.showNewProductForm = !this.showNewProductForm
  }

  setNewProductCategory(option:any){
    this.modelnewProductCategory = option
  }

  setNewSubCategory(option:any){
    this.modelnewProductSubCategory = option
    this.modelnewSubCategoriesIds.push(this.modelnewProductSubCategory.id)
  }

  // Se encarga de cambiar el valor de la variable imageFile cuando se selecciona un archivo
  imageFileChange(event:any) {
    // Obtiene el archivo seleccionado
    const file:File = event.target.files[0];
    this.imageFile = file
  }  


  submitProduct(){
    this.isSubmitted = true
    // if(this.newMakeupForm.invalid) return

    const fv = this.newProductForm.value

    const formData = new FormData();
    formData.append('image', this.imageFile);


    const jsonProduct = {
      name: fv.name,
      description: fv.description,
      price: fv.price,
      category: this.modelnewProductCategory.id,
      subCategories: this.modelnewSubCategoriesIds,
      availibility: true
    }

    formData.append('data', JSON.stringify(jsonProduct));
    alert(formData.get('data'))

    this.shopService.createProduct(formData).subscribe((newProduct) => {
      alert('Makeup created')
      this.router.navigateByUrl(this.returnURL)})
  }
}
