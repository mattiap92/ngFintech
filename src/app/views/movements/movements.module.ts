import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { MovementComponent } from './components/movement.component';
import { MovementsComponent } from './movements.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';


@NgModule({
  declarations: [
    MovementsComponent,
    MovementComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class MovementsModule { }
