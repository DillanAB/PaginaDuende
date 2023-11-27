import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { TextInputsComponent } from './components/partials/text-inputs/text-inputs.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { ShopPageComponent } from './components/pages/shop-page/shop-page.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { MakeupPageComponent } from './components/pages/makeup-page/makeup-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { CatPopUpComponent } from './components/partials/cat-pop-up/cat-pop-up.component';
import { TitleComponent } from './components/partials/title/title.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { PayPageComponent } from './components/pages/pay-page/pay-page.component';
import { AgendaComponent } from './components/pages/agenda/agenda.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NotificationPageComponent } from './components/pages/notification-page/notification-page.component';

// FullCalendarModule([
//   interactionPlugin,
//   dayGridPlugin
// ])

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginPageComponent,
    RegisterPageComponent,
    TextInputsComponent,
    InputContainerComponent,
    InputValidationComponent,
    DefaultButtonComponent,
    ShopPageComponent,
    ProductPageComponent,
    MakeupPageComponent,
    CartPageComponent,
    CategoriesPageComponent,
    CatPopUpComponent,
    CartPageComponent,
    TitleComponent,
    FooterComponent,
    PayPageComponent,
    AgendaComponent,
    NotificationPageComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
