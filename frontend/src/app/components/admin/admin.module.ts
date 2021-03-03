import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './adminpage/adminpage.component';
import { CreateStuffComponent } from './createStuff/createstuff.component';
import { UpdateItemsComponent } from './updateItems/updateItems.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    CreateStuffComponent,
    UpdateItemsComponent
  ],
  imports: [
    ReactiveFormsModule,
    AdminRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: []
})

export class AdminModule { }
