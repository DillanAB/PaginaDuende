import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, sample } from 'rxjs';
import { IMakeupRegister } from 'src/interfaces/IMakeupRegister';
import { GALLERY_BY_TAG_URL, GALLERY_CATS_URL, GALLERY_CREATE_CAT, GALLERY_CREATE_SUBCAT, GALLERY_EDIT_CAT, GALLERY_EDIT_SUBCAT, GALLERY_MAKEUP_BY_Category_URL, GALLERY_MAKEUP_BY_ID_URL, GALLERY_MAKEUP_BY_SUBCategory_URL, GALLERY_TAGS_URL, GALLERY_UPLOAD, GALLERY_URL } from 'src/shared/constants/urls';
import { MakeupCategory } from 'src/shared/models/MakeupCategory';
import { MakeupService } from 'src/shared/models/MakeupService';
import { Tag } from 'src/shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<MakeupService[]> {
    return this.http.get<MakeupService[]>(GALLERY_URL)
  }

  getMakeupServiceById(id:string): Observable<MakeupService> {
    return this.http.get<MakeupService>(GALLERY_MAKEUP_BY_ID_URL + id)
  }

  getMakeupsByCategory(categoryId:string): Observable<MakeupService[]> {
    return this.http.get<MakeupService[]>(GALLERY_MAKEUP_BY_Category_URL + categoryId)
  }

  getMakeupsBySubCategory(subcategoryId:string): Observable<MakeupService[]> {
    return this.http.get<MakeupService[]>(GALLERY_MAKEUP_BY_SUBCategory_URL + subcategoryId)
  }

  getAllCats(): Observable<MakeupCategory[]> {
    return this.http.get<MakeupCategory[]>(GALLERY_CATS_URL)
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(GALLERY_TAGS_URL)
  }

  //Obtiene los maquillajes por tag
  getAllMakeupsByTag(tagId: string): Observable<MakeupService[]> {
    return this.http.get<MakeupService[]>(GALLERY_BY_TAG_URL + tagId)
  }

  createMakeup(formData:FormData): Observable<MakeupService> {
    return this.http.post<MakeupService>(GALLERY_UPLOAD, formData)
  }


  //******************CATEGORÍAS******************** */
  //Edita una categoría
  editCategory(form:any): Observable<MakeupCategory> {
    return this.http.post<MakeupCategory>(GALLERY_EDIT_CAT, form)
  }
  //Edita una subcategoría
  editSubcategory(form:any): Observable<MakeupCategory> {
    return this.http.post<MakeupCategory>(GALLERY_EDIT_SUBCAT, form)
  }
  //Crea una categoría
  createCategory(form:any): Observable<MakeupCategory> {
    return this.http.post<MakeupCategory>(GALLERY_CREATE_CAT, form)
  }
  //Crea una subcategoría
  createSubcategory(form:any): Observable<MakeupCategory> {
    return this.http.post<MakeupCategory>(GALLERY_CREATE_SUBCAT, form)
  }

}
