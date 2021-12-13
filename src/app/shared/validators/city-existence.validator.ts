import { map, shareReplay } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { Directive, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroupDirective, NgForm, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { City } from 'src/app/models/city';
import { CitiesService } from 'src/app/api/cities.service';
import { Observable } from 'rxjs';


export class CityExistenceErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError('cityDoNotExist')
    const userActions = control?.dirty || control?.touched || form?.submitted;

    return !!((invalidControl || invalidParent) && userActions); 
  }
} 
 
@Directive({ 
    selector: '[cityExistenceValidator]',  
    providers: [{
       provide: NG_VALIDATORS, 
       useExisting: CityExistenceValidatorDirective,
       multi: true
    }]
 })
 export class CityExistenceValidatorDirective implements Validator {


  constructor(private cityExistenceValidator: CityExistenceValidator) {}

  validate(): ValidationErrors | null {
    return this.cityExistenceValidator.cityExistenceValidator();
  }
} 


@Injectable({ providedIn: 'root' })
export class CityExistenceValidator {


   cities$: Observable<City[]> | null = null;

   constructor(private citiesService: CitiesService) {
     this.cities$! = this.citiesService.getCities().pipe(shareReplay(1))
   }


   cityExistenceValidator(): AsyncValidatorFn  {
     return(control: AbstractControl): Observable<ValidationErrors | null> => {
  
            const insertedCityName = control.value      

            return this.cities$!.pipe(map(cities => 
              cities.map(city => city.nome.toLowerCase())),
                  map(cityNames => cityNames.includes(insertedCityName.toLowerCase())),
                    map(cityNameIsPresent => {
                       return !cityNameIsPresent ? { cityDoNotExist: true }  : null 
              }))
            
       }
   }   

}   

