import { Directive, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CardsService } from "src/app/api/cards.service";
import { Card } from "src/app/models/card";

@Directive({ 
  selector: '[cardIdValidator]',  
      providers: [{
           provide: NG_VALIDATORS, 
           useExisting: CardIdValidatorDirective,
           multi: true
      }]
  })
  export class CardIdValidatorDirective implements Validator {
  
    constructor(private cardIdValidator: CardIdValidator) {}
  
    validate(): ValidationErrors | null {
      return this.cardIdValidator.existingCardWithGivenId();
    }
  } 
  
  
  @Injectable({ providedIn: 'root' })
  export class CardIdValidator {
  
    constructor(private cardService: CardsService) {}
  
  
    existingCardWithGivenId(): AsyncValidatorFn  {
      return(control: AbstractControl): Observable<ValidationErrors | null> => {
  
        let currentCardId: string = control.value 
        return this.cardService.getCards().
               pipe(
                  map(cards => cards.find(card => card._id === currentCardId)))
                   .pipe(
                       map( (cardFound: Card | undefined) => {  
                          return !cardFound ? { cardIdIsNotValid: true } : null  
                        }))
        } 
    }   
  
  }             
                  