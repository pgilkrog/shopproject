import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGaurd } from './auth.guard';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { SignupSigninComponent } from './signup-signin/signupsignin.component';
import { UserpageComponent } from './userpage/userpage.component';

const routes = [
  { path: 'SignupSignin', component: SignupSigninComponent },
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: 'UserPage', component: UserpageComponent, canActivate: [AuthGaurd], data: { role: 'user'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})

export class AuthRoutingModule {}
