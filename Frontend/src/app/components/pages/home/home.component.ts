import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery-service.service';
import { UserService } from 'src/app/services/user.service';
import { IMakeupRegister } from 'src/interfaces/IMakeupRegister';
import { GALLERY_UPLOAD } from 'src/shared/constants/urls';
import { MakeupCategory } from 'src/shared/models/MakeupCategory';
import { MakeupService } from 'src/shared/models/MakeupService';
import { MakeupSubcategory } from 'src/shared/models/MakeupSubCategory';
import { Tag } from 'src/shared/models/Tag';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef = new ElementRef('');
  modelnewMakeupCategory:MakeupCategory = new MakeupCategory("","",[])
  modelnewSubCategory:MakeupSubcategory = new MakeupSubcategory("","")
  modelnewSubCategoriesIds:string[] = []
  imageFile:File = new File([""], "")
  control:FormControl = new FormControl('')
  isSubmitted = false
  returnURL = ''
  newMakeupForm!:FormGroup
  showNewMakeupForm: boolean = false;
  user!:User
  makeupCats: MakeupCategory[] = []
  makeupServices: MakeupService[] = []
  tags: Tag[] = []

    constructor(private userService:UserService, private galleryService: GalleryService,
      activadedRoute: ActivatedRoute, private formBuilder:FormBuilder,private router:Router) {
        
      userService.userObservable.subscribe((newUser:User) => {
        this.user = newUser
      })

      let catsObservable:Observable<MakeupCategory[]>
      let servicesObservable:Observable<MakeupService[]>
      let tagsObservable:Observable<Tag[]>
      activadedRoute.params.subscribe((params) => {
        if(params.tagId){
          servicesObservable = galleryService.getAllMakeupsByTag(params.tagId)
        }else if(params.categoryId){
          //Entra cuando se selecciona una categoría
          servicesObservable = galleryService.getMakeupsByCategory(params.categoryId)
        }else if(params.subcategoryId){
          //Entra cuando se selecciona una subcategoría
          servicesObservable = galleryService.getMakeupsBySubCategory(params.subcategoryId)
        }else{
          //Entra cuando no hay categoría ni subcategoría seleccionada (Página inicial de galería)
          servicesObservable = galleryService.getAll()
        }

        //Siempre obtiene todas las categorías, se necesita para los menus
        catsObservable = galleryService.getAllCats()
        tagsObservable = galleryService.getAllTags()
        //Set the makeups
        servicesObservable.subscribe((serverServices) => {
          this.makeupServices = serverServices
        })
        //Set the categories
        catsObservable.subscribe((serverCats) => {
          this.makeupCats = serverCats
        })
        //Set the tags
        tagsObservable.subscribe((serverTags) => {
          this.tags = serverTags
        })
        
    })
    }

    setNewMakeupForm(){
      this.showNewMakeupForm = !this.showNewMakeupForm;
    }

    setNewMakeupCategory(option:any){
      this.modelnewMakeupCategory = option
      // alert(this.modelnewMakeupCategory.name)
    }

    setNewSubCategory(option:any){
      this.modelnewSubCategory = option
      this.modelnewSubCategoriesIds.push(this.modelnewSubCategory.id)
      // alert(this.modelnewSubCategoriesIds.length)
    }

    //Control de los menús
    showSubcategories: any = null;
    showTags: any = null;

    ngOnInit(): void {
      this.newMakeupForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: ['', [Validators.required]],
        price: ['', [Validators.required]],
        category: this.modelnewMakeupCategory.id,
        subCategories: this.modelnewSubCategoriesIds,
      }
    )
    this.returnURL = '/gallery'
  }
  get fc() {
    return this.newMakeupForm.controls
  }

  submitMakeup(){
    this.isSubmitted = true
    // if(this.newMakeupForm.invalid) return

    const fv = this.newMakeupForm.value

    const formData = new FormData();
    formData.append('image', this.imageFile);


    const makeup:IMakeupRegister = {
      name: fv.name,
      description: fv.description,
      price: fv.price,
      category: this.modelnewMakeupCategory.id,
      subCategories: this.modelnewSubCategoriesIds,
    }

    formData.append('data', JSON.stringify(makeup));
    alert(formData.get('data'))

    this.galleryService.createMakeup(formData).subscribe((newMakeup) => {
      alert('Makeup created')
      this.router.navigateByUrl(this.returnURL)})
      
    }

      // Se encarga de cambiar el valor de la variable imageFile cuando se selecciona un archivo
      imageFileChange(event:any) {
        // Obtiene el archivo seleccionado
        const file:File = event.target.files[0];
        this.imageFile = file
      }  
}

