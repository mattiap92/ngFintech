import { Constants } from 'src/app/shared/utils/constants';
import { CardForm } from 'src/app/models/card-form';
import { createAction, props } from '@ngrx/store';
import { Card } from 'src/app/models/card';

export const getCards = createAction(
  Constants.NGRX_ACTIONS_GET_ALL_CARDS
);

export const getCardsSuccess = createAction(
  Constants.NGRX_ACTIONS_GET_ALL_CARDS_SUCCESS,
  props<{ cards: Card[] }>()
)

export const getCardsFail = createAction(
  Constants.NGRX_ACTIONS_GET_ALL_CARDS_FAIL
)

export const addCard = createAction(
  Constants.NGRX_ACTIONS_ADD_CARD,
  props<{ cardForm: CardForm }>()
);

export const addCardSuccess = createAction(
  Constants.NGRX_ACTIONS_ADD_CARD_SUCCESS,
  props<{ card: Card }>()
);

export const addCardFail = createAction(
  Constants.NGRX_ACTIONS_ADD_CARD_FAIL
);

export const removeCard = createAction(
  Constants.NGRX_ACTIONS_REMOVE_CARD,
  props<{ id: string }>()
)

export const removeCardSuccess = createAction(
  Constants.NGRX_ACTIONS_REMOVE_CARD_SUCCESS,
  props<{ id: string }>()
)

export const removeCardFail = createAction(
  Constants.NGRX_ACTIONS_REMOVE_CARD_FAIL
)


