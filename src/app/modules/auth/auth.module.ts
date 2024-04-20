import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[
  ]
})
export class AuthModule { }
