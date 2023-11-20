import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/shared/models/Product';
import { ProductCategory } from 'src/shared/models/ProductCategory';
import { ProductSubcategory } from 'src/shared/models/ProductSubCategory';
import { Observable } from 'rxjs';
import { SHOP_CATS_URL, SHOP_PRODUCT_BY_Category_URL, SHOP_PRODUCT_BY_ID_URL, SHOP_PRODUCT_BY_SUBCategory_URL, SHOP_UPLOAD, SHOP_URL } from 'src/shared/constants/urls';
import { Order } from 'src/shared/models/Order';
import { ShoppingCart } from 'src/shared/models/ShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http:HttpClient) { }
  //Obtiene todos los productos
  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(SHOP_URL)
  }
  //Obtiene un producto por id
  getProductById(productId:string):Observable<Product>{
    return this.http.get<Product>(SHOP_PRODUCT_BY_ID_URL + productId)
  }
  //Obtiene productos por categoría
  getProductsByCategory(categoryId:string): Observable<Product[]> {
    return this.http.get<Product[]>(SHOP_PRODUCT_BY_Category_URL + categoryId)
  }
  //Obtiene productos por subcategoría
  getProductsBySubCategory(subcategoryId:string): Observable<Product[]> {
    return this.http.get<Product[]>(SHOP_PRODUCT_BY_SUBCategory_URL + subcategoryId)
  }
  //Obtiene todas las categorías
  getAllCats(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(SHOP_CATS_URL)
  }
  //Crea un producto
  createProduct(formData:FormData): Observable<Product> {
    return this.http.post<Product>(SHOP_UPLOAD, formData)
  }

  buyCart(cart:ShoppingCart):Observable<Order> {
    return this.http.post<Order>(SHOP_UPLOAD, cart)
  }
}
