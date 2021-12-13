import { Constants } from 'src/app/shared/utils/constants';
import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

export function taxCodeValidator(control: AbstractControl): ValidationErrors | null {
  return taxCodeValidatorFromString(control?.value)
}

export function taxCodeValidatorFromString(value: string): ValidationErrors | null {
  const taxCodeItalianRgx = Constants.REGEX_TAXCODE;
  const taxCodeRegex = new RegExp(taxCodeItalianRgx);
  const condition =  !taxCodeRegex.test(value)
  return condition ? { isNotValidTaxCode: true } : null;
}

@Directive({ 
  selector: '[taxCodeValidator]',  
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: TaxCodeValidatorDirective,
    multi: true
  }]
})
export class TaxCodeValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return taxCodeValidator(control);
  }
} 