import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from './components/auth/auth.guard';

import { CreateStuffComponent } from './components/admin/createStuff/createstuff.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ItemDetailComponent } from './components/itemComponents/itemDetail/itemDetail.component';
import { ItemListComponent } from './components/itemComponents/itemList/itemList.component';
import { OrderCompleteComponent } from './components/ShoppingCartComps/orderComplete/orderComplete.component';
import { ShoppingCartComponent } from './components/ShoppingCartComps/ShoppingCart/shoppingCart.component';
import { SignupSigninComponent } from './components/userComponents/signup-signin/signupsignin.component';
import { UserpageComponent } from './components/userComponents/userpage/userpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomepageComponent },
  { path: 'ItemList', component: ItemListComponent },
  { path: 'ItemDetail/:id', component: ItemDetailComponent },
  { path: 'FilteredList/:category', component: ItemListComponent},
  { path: 'ShoppingCart', component: ShoppingCartComponent },
  { path: 'CompletedOrder', component: OrderCompleteComponent },
  { path: 'SignupSignin', component: SignupSigninComponent },
  { path: 'CreateStuff', component: CreateStuffComponent, canActivate: [AuthGaurd], data: { role: 'admin' } },
  { path: 'UserPage', component: UserpageComponent, canActivate: [AuthGaurd], data: { role: 'user'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})

export class AppRoutingModule { }
