import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { taxCodeValidatorFromString } from "./tax-code.validator";



export function taxPayerValidator(control: AbstractControl): ValidationErrors | null {

  let taxCodeFormatIsInvalid = false;

  const taxCode = control.value.taxCode
  const name = control.value.name
  const surname = control.value.surname
  const birthDate = control.value.birthDate
  const sex = control.value.sex
  const birthProvince = control.value.birthProvince
  const birthCity = control.value.birthCity
  
  const taxCodeExist = taxCode != null && !!taxCode.trim().length && taxCode != undefined
  const nameExist = name != null &&  !!name.trim().length && name != undefined
  const surnameExist = surname != null && !!surname.trim().length && surname != undefined
  const birthDateExist = birthDate != null && birthDate != undefined
  const sexExist = sex != null && !!sex.trim().length && sex != undefined
  const birthProvinceExist = birthProvince != null && !!birthProvince.trim().length && birthProvince != undefined
  const birthCityExist = birthCity != null && !!birthCity.trim().length && birthCity != undefined

  const taxCodeValidationResult = taxCodeValidatorFromString(taxCode);

 
  if(taxCodeValidationResult != null) {
      taxCodeFormatIsInvalid = true
  }
   
  if(taxCodeExist && !taxCodeFormatIsInvalid &&
     surnameExist && nameExist && birthDateExist &&
     sexExist && birthProvinceExist && birthCityExist) {
      return null
    }
 
  return {
    taxCodeRequired: !taxCodeExist,
    isNotValidTaxCode: taxCodeFormatIsInvalid,
    surnameRequired: !surnameExist,
    nameRequired: !nameExist,
    birthDateRequired: !birthDateExist,
    sexRequired: !sexExist,
    birthProvinceRequired: !birthProvinceExist,
    birthCityRequired: !birthCityExist,
  }

}



@Directive({ 
  selector: '[taxPayerValidator]',  
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: TaxPayerValidatorDirective,
    multi: true
  }]
})
export class TaxPayerValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return taxPayerValidator(control);
  }
} 