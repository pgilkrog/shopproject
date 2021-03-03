import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { SignupSigninComponent } from './signup-signin/signupsignin.component';
import { UserpageComponent } from './userpage/userpage.component';

@NgModule({
  declarations: [
    ResetPasswordComponent,
    SignupSigninComponent,
    UserpageComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})

export class AuthModule { }
