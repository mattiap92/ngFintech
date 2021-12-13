import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


export function treasuryRowValidator(control: AbstractControl): ValidationErrors | null {

    const tributeCode = control?.value?.tributeCode
    const year = control?.value?.year
    const debit = control?.value?.debit
    const credit = control?.value?.credit

    const tributeCodeExist = tributeCode != null && !!tributeCode.trim().length && tributeCode != undefined
    const yearExist = year != null && year != undefined
    const debitExist = debit != null && debit != undefined
    const creditExist = credit != null  && credit != undefined

    if(tributeCodeExist  && yearExist && debitExist && creditExist) {
      return null
    }
 
    return {
      tributeCodeRequired: !tributeCodeExist,
      yearRequired: !yearExist,
      creditRequired: !creditExist,
      debitRequired: !debitExist
    
    }
    
  }

 


@Directive({ 
  selector: '[treasuryRowValidator]',  
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: TreasuryRowValidatorDirective,
    multi: true
  }]
})
export class TreasuryRowValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return treasuryRowValidator(control);
  }
} 