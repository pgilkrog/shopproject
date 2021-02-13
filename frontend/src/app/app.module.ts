import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateStuffComponent } from './components/admin/createStuff/createstuff.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { ItemListComponent } from './components/itemComponents/itemList/itemList.component';
import { ItemSingleComponent } from './components/itemComponents/itemList/itemSingle/itemSingle.component';
import { ItemDetailComponent } from './components/itemComponents/itemDetail/itemDetail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShoppingCartComponent } from './components/ShoppingCartComps/ShoppingCart/shoppingCart.component';
import { SpinnerComponent } from './components/UIComponents/Spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CreateStuffComponent,
    NavbarComponent,
    ItemListComponent,
    ItemSingleComponent,
    ItemDetailComponent,
    ShoppingCartComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
