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

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CreateStuffComponent,
    NavbarComponent,
    ItemListComponent,
    ItemSingleComponent,
    ItemDetailComponent
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
