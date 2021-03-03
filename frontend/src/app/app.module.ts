import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { FilterPipe } from './components/utils/filterpipe.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NavSearchComponent } from './components/navigation/navSearch/navSearch.component';
import { RatingComponent } from './components/itemComponents/itemDetail/ratingComponent/rating.component';
import { AuthModule } from './components/auth/auth.module';

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
    RatingComponent
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
    BrowserAnimationsModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
