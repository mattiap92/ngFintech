import { Constants } from 'src/app/shared/utils/constants';
import { selectCards } from './store/cards.selectors';
import { Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CardForm } from 'src/app/models/card-form';
import { CardFormComponent } from './components/card-form.component';
import { Store } from '@ngrx/store';
import * as CardsActions from './store/cards.actions';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent implements OnInit{

  origin_cards$ = this.store.select(selectCards);

  @ViewChild('cardFormReference')
  cardForm : CardFormComponent | undefined;
  
  @ViewChild('sidenavReference')
  sidenavReference : MatSidenav | undefined;


  constructor(private router: Router, private store: Store) {}


  ngOnInit(): void {
   this.getCards()
  } 

  getCards(){
    this.store.dispatch(CardsActions.getCards());
  }

  manageAddNewCardButtonClicked(cardForm: CardForm) {
    this.store.dispatch(CardsActions.addCard({cardForm}))
    this.resetFormAndCloseSidenav()
  }

  manageDeleteButtonClicked(id: string) {
    this.store.dispatch(CardsActions.removeCard({ id }))
  }


  resetFormAndCloseSidenav(){
    this.sidenavReference?.toggle();
    this.cardForm?.cleanUp();
  }
    
  manageSelectedCardMovementsChecking(selectedCardId: string){
   let url = Constants.ROOTS_DASHBOARD + '/' + Constants.ROOTS_MOVEMENTS + '/' + selectedCardId
   this.router.navigate([url])
  } 

}
