import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

export function secureCodeValidator(control: AbstractControl): ValidationErrors | null {
  let secureCode = control?.value
  const condition = (secureCode?.toString().length < 3);
  return condition ? { isNotEnoughLong: true } : null;
}



@Directive({ 
selector: '[secureCodeValidator]',  
    providers: [{
         provide: NG_VALIDATORS, 
         useExisting: SecureCodeValidatorDirective,
         multi: true
    }]
})
export class SecureCodeValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return secureCodeValidator(control);
  }
} 
 