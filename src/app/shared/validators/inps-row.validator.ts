import { dateConsistencyValidatorFromString } from 'src/app/shared/validators/date-consistency.validator';
import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


export function inpsRowValidator(control: AbstractControl): ValidationErrors | null {
    let fromDateIsAfterToDate = false;

    const siteCode = control?.value?.siteCode
    const contributionCausal = control?.value?.contributionCausal
    const inpsCode = control?.value?.inpsCode
    const fromDate = control?.value?.fromDate
    const toDate = control?.value?.toDate  
    const credit = control?.value?.credit
    const debit = control?.value?.debit


    const siteCodeExist = siteCode != null && !!siteCode.trim().length && siteCode != undefined
    const contributionCausalExist = contributionCausal != null && !!contributionCausal.trim().length && contributionCausal != undefined
    const inpsCodeExist = inpsCode != null && !!inpsCode.trim().length && inpsCode != undefined
    const fromDateExist = fromDate != null && fromDate != undefined
    const toDateExist = toDate != null && toDate != undefined
    const creditExist = credit != null && credit != undefined
    const debitExist = debit != null && debit != undefined

    
    const dateValidationResult = dateConsistencyValidatorFromString(fromDate, toDate);


    if(dateValidationResult != null) {
      fromDateIsAfterToDate = true
    }

    if(siteCodeExist && !fromDateIsAfterToDate && contributionCausalExist && inpsCodeExist &&
       fromDateExist && toDateExist && creditExist && debitExist) {
      return null
    }
 
    return {
      fromDateIsAfterToDate: fromDateIsAfterToDate,
      siteCodeRequired: !siteCodeExist,
      contributionCausalRequired: !contributionCausalExist,
      inpsCodeRequired: !inpsCodeExist,
      fromDateRequired: !fromDateExist,
      toDateRequired: !toDateExist,
      creditRequired: !creditExist,
      debitRequired: !debitExist
    }
 
}



@Directive({ 
  selector: '[inpsRowValidator]',  
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: InpsRowValidatorDirective,
    multi: true
  }]
})
export class InpsRowValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return inpsRowValidator(control);
  }
} 