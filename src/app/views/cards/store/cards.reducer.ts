import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Card } from 'src/app/models/card';
import {
  addCardSuccess,
  getCards,
  getCardsSuccess,
  removeCardSuccess
} from './cards.actions';


export interface CardsState extends EntityState<Card> {
  isLoading: boolean
}

export const adapter: EntityAdapter<Card> = createEntityAdapter<Card>({
  selectId: (card : Card) => card._id
})

export const initialState: CardsState = adapter.getInitialState({
  filter: 'ALL',
  isLoading: false,
})

export const cardsReducer = createReducer(
  initialState,
  on(addCardSuccess, (state, action) => {
    return adapter.addOne(action.card, state);
  }),
  on(removeCardSuccess, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),
  on(getCards, (state) => ({
    ...state,
    isLoading: true
  })),
  on(getCardsSuccess, (state, action) => {
    return adapter.setAll(action.cards, {
      ...state,
      isLoading: false
    })
  })
);

export const cardsFeature = createFeature({
  name: 'cards',
  reducer: cardsReducer
});
