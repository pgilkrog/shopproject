import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

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
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: []
})

export class AuthModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
