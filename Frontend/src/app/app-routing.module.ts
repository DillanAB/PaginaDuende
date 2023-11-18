import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { ShopPageComponent } from './components/pages/shop-page/shop-page.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { MakeupPageComponent } from './components/pages/makeup-page/makeup-page.component'
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { PayPageComponent } from './components/pages/pay-page/pay-page.component';

const routes: Routes = [
  //{path:'', component:HomeComponent},
  {path:'', component:LoginPageComponent}, //Para que la página de login sea la inicial
  {path:'gallery', component:HomeComponent},
  {path:'gallery/categories', component:CategoriesPageComponent},
  {path:'makeup/:id', component:MakeupPageComponent},
  {path:'category/:categoryId', component:HomeComponent},
  {path:'subcategory/:subcategoryId', component:HomeComponent},
  {path:'tag/:tagId', component:HomeComponent},
  {path:'register', component:RegisterPageComponent},
  {path:'shop', component:ShopPageComponent},
  {path:'shop/category/:categoryId', component:ShopPageComponent},
  {path:'shop/subcategory/:subcategoryId', component:ShopPageComponent},
  {path:'product/:id', component:ProductPageComponent},
  {path:'cart-page', component:CartPageComponent},
  {path:'pay-page', component:PayPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
