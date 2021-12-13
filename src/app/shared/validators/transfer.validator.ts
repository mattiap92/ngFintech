import { Card } from './../../models/card';
import { CardsService } from './../../api/cards.service';
import { Directive, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroupDirective, NgForm, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';


export class TransferErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError('thereIsNotEnoughMoney');
    const userActions = control?.dirty || control?.touched || form?.submitted;

    return !!((invalidControl || invalidParent) && userActions);
  }
}

@Directive({ 
selector: '[transferValidator]',  
    providers: [{
         provide: NG_VALIDATORS, 
         useExisting: TransferValidatorDirective,
         multi: true
    }]
})
export class TransferValidatorDirective implements Validator {

  constructor(private transferValidator: TransferValidator) {}

  validate(): ValidationErrors | null {
    return this.transferValidator.thereIsEnoughMoney();
  }
} 


@Injectable({ providedIn: 'root' })
export class TransferValidator {

  constructor(private cardService: CardsService) {}


  thereIsEnoughMoney(): AsyncValidatorFn  {
    return(control: AbstractControl): Observable<ValidationErrors | null> => {

      let transferImport: number = control.get('amount')?.value
      let totalCardAmountAfterTransfer: number;

      return this.cardService.getCards().pipe(map(cards => cards.find(card => card._id === control.get('cardId')?.value)))
      .pipe(
            map( (cardFound: Card | undefined) => {  
                        totalCardAmountAfterTransfer = cardFound!.amount - transferImport;
                        return totalCardAmountAfterTransfer < 0 ? { thereIsNotEnoughMoney: true } : null  
                      }))
      } 
  }   

}             
                



