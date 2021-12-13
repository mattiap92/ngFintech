import { Constants } from 'src/app/shared/utils/constants';
import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

export function ibanValidator(control: AbstractControl): ValidationErrors | null {
  const IBANItalianRgx = Constants.REGEX_IBAN
  const ibanRegex = new RegExp(IBANItalianRgx);
  const condition =  !ibanRegex.test(control?.value)
  return condition ? { isNotValidIBAN: true } : null;
}



@Directive({ 
selector: '[ibanValidator]',  
    providers: [{
         provide: NG_VALIDATORS, 
         useExisting: IbanValidatorDirective,
         multi: true
    }]
})
export class IbanValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return ibanValidator(control);
  }
} 
 