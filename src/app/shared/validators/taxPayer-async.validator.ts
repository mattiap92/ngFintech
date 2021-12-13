import { Directive, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { Observable } from "rxjs";
import { shareReplay, map} from "rxjs/operators";
import { CitiesService } from "src/app/api/cities.service";
import { City } from "src/app/models/city";


@Directive({ 
  selector: '[taxPayerAsyncValidator]',  
  providers: [{
     provide: NG_VALIDATORS, 
     useExisting: TaxPayerAsyncValidatorDirective,
     multi: true
  }]
})
export class TaxPayerAsyncValidatorDirective implements Validator {


  constructor(private taxPayerAsyncValidator: TaxPayerAsyncValidator) {}

  validate(): ValidationErrors | null {
    return this.taxPayerAsyncValidator.taxPayerAsyncValidator();
  }
} 

@Injectable({ providedIn: 'root' })
export class TaxPayerAsyncValidator {


   cities$: Observable<City[]> | null = null;

   constructor(private citiesService: CitiesService) {
     this.cities$! = this.citiesService.getCities().pipe(shareReplay(1))
   }


   taxPayerAsyncValidator(): AsyncValidatorFn  {
     return(control: AbstractControl): Observable<ValidationErrors | null> => {
  
            const insertedCityName = control.value.birthCity      

            return this.cities$!.pipe(map(cities => 
              cities.map(city => city.nome.toLowerCase())),
                  map(cityNames => cityNames.includes(insertedCityName.toLowerCase())),
                    map(cityNameIsPresent => {
                       return !cityNameIsPresent ? { cityDoNotExist: true }  : null 
              }))
            
       }
   }   
   
   

}   