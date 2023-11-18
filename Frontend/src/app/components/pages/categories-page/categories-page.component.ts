import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery-service.service';
import { Category } from 'src/shared/models/Category';
import { MakeupCategory } from 'src/shared/models/MakeupCategory';
import { MakeupSubcategory } from 'src/shared/models/MakeupSubCategory';

const NO_OPERATION = 0,
      EDIT_CATEGORY = 1,
      EDIT_SUBCATEGORY = 2,
      EDIT_TAG = 3,
      CREATE_CATEGORY = 4,
      CREATE_SUBCATEGORY = 5,
      CREATE_TAG = 6,
      DELETE_CATEGORY = 7,
      DELETE_SUBCATEGORY = 8,
      DELETE_TAG = 9

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit{
  operation = NO_OPERATION
  returnURL = '/gallery/categories'
  makeupCats: MakeupCategory[] = []
  category!: Category
  subcategory!: MakeupSubcategory 
  showEditForm: boolean = false;
  isSubmitted: boolean = false
  newCategoryForm!:FormGroup

  constructor (private galleryService: GalleryService, private formBuilder:FormBuilder, private router:Router){
    let catsObservable:Observable<MakeupCategory[]>

    //Siempre obtiene todas las categorías, se necesita para los menus
    catsObservable = galleryService.getAllCats()
        
    catsObservable.subscribe((serverCats) => {
      this.makeupCats = serverCats
    })

  }
  ngOnInit(): void {
    this.newCategoryForm = this.formBuilder.group({ name: ['', [Validators.required, Validators.minLength(1)]]})
  }

  //Abre el formulario para editar una categoría
  editCategory(category: Category){
    this.showEditForm = true;
    this.category = category
    this.operation = EDIT_CATEGORY
  }
  //Abre el formulario para editar una subcategoría
  editSubCategory(category: Category, subcategory: MakeupSubcategory){
    this.showEditForm = true;
    this.category = category
    this.subcategory = subcategory
    this.operation = EDIT_SUBCATEGORY
  }
  //Abre el formulario para crear una categoría
  createCategory(){
    this.showEditForm = true;
    this.operation = CREATE_CATEGORY
  }
  //Abre el formulario para crear una subcategoría
  createSubcategory(category: Category){
    this.showEditForm = true;
    this.category = category
    this.operation = CREATE_SUBCATEGORY
  }

  //Cancela la edición de una categoría
  cancelEdit(){
    this.showEditForm = false;
    this.category.id = ""
    this.category.name = ""
    this.newCategoryForm = this.formBuilder.group({ name: ['', [Validators.required, Validators.minLength(1)]]})
  }

  get fc() {
    return this.newCategoryForm.controls
  }

  submitCategory(){
    this.isSubmitted = true
    const fv = this.newCategoryForm.value
    const opForm = new FormData();
    switch(this.operation){
      case EDIT_CATEGORY:
        opForm.append('id', this.category.id)
        opForm.append('newName', fv.name)
        this.galleryService.editCategory(opForm).subscribe((serverCategory) => {
          this.category = serverCategory
          this.showEditForm = false
          alert(this.category.name + " editada correctamente")
        })
        break

      case EDIT_SUBCATEGORY:
        opForm.append('catId', this.category.id)
        opForm.append('id', this.subcategory.id)
        opForm.append('newName', fv.name)
        this.galleryService.editSubcategory(opForm).subscribe((serverSubcategory) => {
          this.subcategory = serverSubcategory
          this.showEditForm = false
          alert(this.subcategory.name + " editada correctamente")
        })
        break

      case CREATE_CATEGORY:
        opForm.append('name', fv.name)
        this.galleryService.createCategory(opForm).subscribe((serverCategory) => {
          this.category = serverCategory
          this.showEditForm = false
          alert(this.category.name + " creada correctamente")
        })
        break

      case CREATE_SUBCATEGORY:
        opForm.append('catId', this.category.id)
        opForm.append('name', fv.name)
        this.galleryService.createSubcategory(opForm).subscribe((serverSubcategory) => {
          this.subcategory = serverSubcategory
          this.showEditForm = false
          alert(this.subcategory.name + " creada correctamente")
        })
        break

      case DELETE_CATEGORY:
        break

      case DELETE_SUBCATEGORY:
        break

      case NO_OPERATION:
        default:
          break
    }
    this.router.navigateByUrl(this.returnURL)
  }

}
