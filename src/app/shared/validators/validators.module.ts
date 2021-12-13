import { TaxPayerValidatorDirective } from './taxPayer.validator';
import { CityExistenceValidatorDirective } from './city-existence.validator';
import { TransferValidatorDirective } from './transfer.validator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualFieldsValidatorDirective } from './equal-fields.validator';
import { AmountValidatorDirective } from './amount.validator';
import { IbanValidatorDirective } from './iban.validator';
import { TaxCodeValidatorDirective } from './tax-code.validator';
import { CardIdValidatorDirective } from './card-id.validator';
import { DateConsistencyValidatorDirective } from './date-consistency.validator';
import { TreasuryRowValidatorDirective } from './treasury-row.validator';
import { InpsRowValidatorDirective } from './inps-row.validator';



@NgModule({
  declarations: [
    EqualFieldsValidatorDirective,
    AmountValidatorDirective,
    IbanValidatorDirective,
    TaxCodeValidatorDirective,
    TransferValidatorDirective,
    CardIdValidatorDirective,
    DateConsistencyValidatorDirective,
    CityExistenceValidatorDirective,
    TaxPayerValidatorDirective,
    TreasuryRowValidatorDirective,
    InpsRowValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EqualFieldsValidatorDirective,
    AmountValidatorDirective,
    IbanValidatorDirective,
    TaxCodeValidatorDirective,
    TransferValidatorDirective,
    CardIdValidatorDirective,
    DateConsistencyValidatorDirective,
    CityExistenceValidatorDirective,
    TaxPayerValidatorDirective,
    TreasuryRowValidatorDirective,
    InpsRowValidatorDirective
  ]
})
export class ValidatorsModule { }
