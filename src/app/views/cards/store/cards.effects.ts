import { Constants } from 'src/app/shared/utils/constants';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CardActions from './cards.actions';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import * as SnackBarActions from './snackbar.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class CardsEffects {

  constructor(
    private actions: Actions,
    private cardsService: CardsService,
    private store: Store) {}

  getCards$ = createEffect(() => this.actions.pipe(
    ofType(CardActions.getCards),
    switchMap(() => this.cardsService.getCards().pipe(
      map(cards => CardActions.getCardsSuccess({ cards })),
      catchError(() => of(CardActions.getCardsFail()))
    )),
  ));

  addCard$ = createEffect(() => this.actions.pipe(
    ofType(CardActions.addCard),
    concatMap(action => {
      const newCard = {
        type: action.cardForm.type,
        name: action.cardForm.name,
        surname: action.cardForm.surname,
        number: action.cardForm.number,
        csc: action.cardForm.csc
      }
      return this.cardsService.addCard(newCard).pipe(
        map(card => CardActions.addCardSuccess({ card })),
        catchError(() => of(CardActions.addCardFail()))
      )
    }),tap(() => this.store.dispatch(SnackBarActions.openSuccessSnackBar({ message: Constants.SNACKBAR_ADD_CARD_SUCCESS_MESSAGE })))
  ))

  removeCard$ = createEffect(() => this.actions.pipe(
    ofType(CardActions.removeCard),
    mergeMap(({ id }) => this.cardsService.deleteCardById(id).pipe(
      map(() => CardActions.removeCardSuccess({ id })),
      catchError(() => of(CardActions.removeCardFail())),
    )),tap(() => this.store.dispatch(SnackBarActions.openSuccessSnackBar({ message: Constants.SNACKBAR_REMOVE_CARD_SUCCESS_MESSAGE }))),
  ))

}
