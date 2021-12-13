import { ContactsModule } from './../contacts/contacts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { TransferComponent } from './transfer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferRoutingModule } from './transfer-routing.module';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';


@NgModule({
  declarations: [
    TransferComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsModule,
    ValidatorsModule
  ]
})
export class TransferModule { }
