import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from '../auth/auth.guard';
import { AdminPageComponent } from './adminpage/adminpage.component';
import { CreateStuffComponent } from './createStuff/createstuff.component';
import { UpdateItemsComponent } from './updateItems/updateItems.component';

const routes: Routes = [
  { path: 'AdminPage', component: AdminPageComponent, canActivate: [AuthGaurd], data: { role: 'admin' }},
  { path: 'CreateStuff', component: CreateStuffComponent, canActivate: [AuthGaurd], data: { role: 'admin' }},
  { path: 'UpdateItems', component: UpdateItemsComponent, canActivate: [AuthGaurd], data: { role: 'admin' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})

export class AdminRoutingModule { }
