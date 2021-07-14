import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AdminModule } from './components/admin/admin.module';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { ItemListComponent } from './components/itemComponents/itemList/itemList.component';
import { ItemSingleComponent } from './components/itemComponents/itemList/itemSingle/itemSingle.component';
import { ItemDetailComponent } from './components/itemComponents/itemDetail/itemDetail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShoppingCartComponent } from './components/ShoppingCartComps/ShoppingCart/shoppingCart.component';
import { SpinnerComponent } from './components/UIComponents/Spinner/spinner.component';
import { OrderCompleteComponent } from './components/ShoppingCartComps/orderComplete/orderComplete.component';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { DropdownComponent } from './components/navigation/dropdown/dropdown.component';
import { OrderDetailComponent } from './components/orderComponents/orderDetail/orderDetail.component';
import { FilterPipe } from './utils/filterpipe.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NavSearchComponent } from './components/navigation/navSearch/navSearch.component';
import { RatingComponent } from './components/itemComponents/itemDetail/ratingComponent/rating.component';
import { AuthModule } from './components/auth/auth.module';
import { PaymentComponent } from './components/ShoppingCartComps/ShoppingCart/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderSearchComponent } from './components/orderComponents/orderSearch/orderSearch.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    DropdownComponent,
    ItemListComponent,
    ItemSingleComponent,
    ItemDetailComponent,
    ShoppingCartComponent,
    OrderCompleteComponent,
    SpinnerComponent,
    OrderDetailComponent,
    FilterPipe,
    NavSearchComponent,
    RatingComponent,
    PaymentComponent,
    FooterComponent,
    OrderSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AdminModule,
    AuthModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
