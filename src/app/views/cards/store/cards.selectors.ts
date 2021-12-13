import { createSelector } from '@ngrx/store';
import { adapter, cardsFeature } from './cards.reducer';

export const {
  selectCardsState,
  selectIsLoading,
} = cardsFeature;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectCards = createSelector(
  selectCardsState,
  selectAll
);


