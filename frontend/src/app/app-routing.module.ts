import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from './components/auth/auth.guard';
import { ResetPasswordComponent } from './components/auth/resetPassword/resetPassword.component';

import { HomepageComponent } from './components/homepage/homepage.component';
import { ItemDetailComponent } from './components/itemComponents/itemDetail/itemDetail.component';
import { ItemListComponent } from './components/itemComponents/itemList/itemList.component';
import { OrderDetailComponent } from './components/orderComponents/orderDetail/orderDetail.component';
import { OrderCompleteComponent } from './components/ShoppingCartComps/orderComplete/orderComplete.component';
import { ShoppingCartComponent } from './components/ShoppingCartComps/ShoppingCart/shoppingCart.component';
import { SignupSigninComponent } from './components/auth/signup-signin/signupsignin.component';
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
  { path: 'OrderDetail/:id', component: OrderDetailComponent },
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: 'UserPage', component: UserpageComponent, canActivate: [AuthGaurd], data: { role: 'user'} },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(a => a.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})

export class AppRoutingModule { }
