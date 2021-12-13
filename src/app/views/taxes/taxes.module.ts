import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { TaxesComponent } from './taxes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxesRoutingModule } from './taxes-routing.module';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';
import { TaxPayerComponent } from './components/taxPayer.component';
import { InpsRowComponent } from './components/inps-row.component';
import { TreasuryRowComponent } from './components/treasury-row.component';
import { TaxesDialogComponent } from 'src/app/core/dialogs/taxes/taxes-dialog.component';




@NgModule({
  declarations: [
    TaxesComponent,
    InpsRowComponent,
    TreasuryRowComponent,
    TaxPayerComponent,
    TaxesDialogComponent
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatorsModule
  ]
})
export class TaxesModule { }
