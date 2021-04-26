import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from './components/auth/auth.guard';

import { HomepageComponent } from './components/homepage/homepage.component';
import { ItemDetailComponent } from './components/itemComponents/itemDetail/itemDetail.component';
import { ItemListComponent } from './components/itemComponents/itemList/itemList.component';
import { OrderDetailComponent } from './components/orderComponents/orderDetail/orderDetail.component';
import { OrderSearchComponent } from './components/orderComponents/orderSearch/orderSearch.component';
import { OrderCompleteComponent } from './components/ShoppingCartComps/orderComplete/orderComplete.component';
import { ShoppingCartComponent } from './components/ShoppingCartComps/ShoppingCart/shoppingCart.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomepageComponent },
  { path: 'ItemList', component: ItemListComponent },
  { path: 'ItemDetail/:id', component: ItemDetailComponent },
  { path: 'FilteredList/:category', component: ItemListComponent},
  { path: 'ShoppingCart', component: ShoppingCartComponent },
  { path: 'CompletedOrder/:orderId', component: OrderCompleteComponent },
  { path: 'OrderSearch', component: OrderSearchComponent },
  { path: 'OrderDetail/:id', component: OrderDetailComponent },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(a => a.AdminModule)},
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(a => a.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})

export class AppRoutingModule { }
