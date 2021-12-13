import { ErrorStateMatcher } from '@angular/material/core';
import { Directive, Input } from "@angular/core";
import { AbstractControl, FormControl, FormGroupDirective, NgForm, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";



export class DateConsistencyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError('fromDateIsAfterToDate');
    const userActions = control?.dirty || control?.touched || form?.submitted;

    return !!((invalidControl || invalidParent) && userActions);
  }
}

 
export function dateConsistencyValidator(fromDateField: string, toDateField: string) {
  return (control: AbstractControl): ValidationErrors | null => {
             const fromDate = control.get(fromDateField)?.value
             const toDate = control.get(toDateField)?.value
             if (!fromDate || !toDate) {
              return null;
             }
             if (fromDate > toDate) {
              return { fromDateIsAfterToDate: true };
             }
             return null;
         }
 }

 export function dateConsistencyValidatorFromString(fromDateField: string, toDateField: string) : ValidationErrors | null{
             const fromDate = fromDateField
             const toDate = toDateField
             if (!fromDate || !toDate) {
              return null;
             }
             if (fromDate > toDate) {
              return { fromDateIsAfterToDate: true };
             }
             return null;
  }



@Directive({ 
    selector: '[dateConsistencyValidator]',  
    providers: [{
       provide: NG_VALIDATORS, 
       useExisting: DateConsistencyValidatorDirective,
       multi: true
    }]
 })
 export class DateConsistencyValidatorDirective implements Validator {

   @Input('fromDate') fromDateField : string | null = null;
   @Input('toDate') toDateField : string | null = null;

   validate(): ValidationErrors | null {
     return dateConsistencyValidator(this.fromDateField!, this.toDateField!);
   }
 } 

