import { LoginComponent } from './login.component';
import { RegisterComponent } from './components/register.component';
import { SignInComponent } from './components/sign-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';
import { AnimationsModule } from 'src/app/shared/animations/animations.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatorsModule,
    AnimationsModule
  ]
})
export class LoginModule { }
