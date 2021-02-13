import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStuffComponent } from './components/admin/createStuff/createstuff.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ItemDetailComponent } from './components/itemComponents/itemDetail/itemDetail.component';
import { ItemListComponent } from './components/itemComponents/itemList/itemList.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'ItemList', component: ItemListComponent },
  { path: 'ItemDetail/:id', component: ItemDetailComponent },
  { path: 'FilteredList/:category', component: ItemListComponent},
  { path: 'CreateStuff', component: CreateStuffComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
