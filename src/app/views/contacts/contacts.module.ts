import { ValidatorsModule } from 'src/app/shared/validators/validators.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { ContactFormComponent } from './components/contact-form.component';
import { ContactsComponent } from './contacts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactListComponent } from './components/contact-list.component';
import { ContactsDialogComponent } from 'src/app/core/dialogs/transfer/contacts-dialog.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactFormComponent,
    ContactListComponent,
    ContactsDialogComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatorsModule
  ]
})
export class ContactsModule { }
