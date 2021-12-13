import { AnimationsModule } from './../../shared/animations/animations.module';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ValidatorsModule,
    AnimationsModule
  ]
})
export class DashboardModule { }
