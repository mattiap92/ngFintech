import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { Constants } from 'src/app/shared/utils/constants';


@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html'
})
export class CardListComponent {


  cards_title: string = Constants.TITLES_CARDS;
  add_word: string = Constants.UI_ACTIONS_ADD;
  remove_tooltip: string = Constants.TOOLTIPS_REMOVE;
  showMovements_tooltip: string = Constants.TOOLTIPS_SHOW_MOVEMENTS;

  @Output() cardMovementsToCheckId = new EventEmitter<string>();
  @Output() cardToDeleteId = new EventEmitter<string>();
  @Output() addCardButtonClicked = new EventEmitter<void>();
  @Input() cards: Card[] | null = []; 


}
