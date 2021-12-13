import { ErrorStateMatcher } from '@angular/material/core';
import { Directive, Input } from "@angular/core";
import { AbstractControl, FormControl, FormGroupDirective, NgForm, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


export class EqualFieldsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError('fieldsDoNotMatch');
    const userActions = control?.dirty || control?.touched || form?.submitted;

    return !!((invalidControl || invalidParent) && userActions);
  }
}
 
export function equalFieldsValidator(firstFieldName: string, secondFieldName: string) {
  return (control: AbstractControl): ValidationErrors | null => {
            const condition =  control.get(firstFieldName)?.value !==  control.get(secondFieldName)?.value  
            return condition ? { fieldsDoNotMatch: true } : null;
         }
 }


@Directive({ 
    selector: '[equalFieldsValidator]',  
    providers: [{
       provide: NG_VALIDATORS, 
       useExisting: EqualFieldsValidatorDirective,
       multi: true
    }]
 })
 export class EqualFieldsValidatorDirective implements Validator {

   @Input('firstFieldName') firstFieldName : string | null = null;
   @Input('secondFieldName') secondFieldName : string | null = null;

   validate(): ValidationErrors | null {
     return equalFieldsValidator(this.firstFieldName!, this.secondFieldName!);
   }
 } 

