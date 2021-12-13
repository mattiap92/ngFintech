import { CardsService } from './../../api/cards.service';
import { Movement } from 'src/app/models/movement';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/shared/utils/constants';


@Component({
  selector: 'movements',
  templateUrl: './movements.component.html'
})
export class MovementsComponent implements OnInit{


  selectCard_label: string = Constants.LABELS_SELECT_CARD;
  noneOption_label: string = Constants.LABELS_OPTION_NONE;
  balance_label: string = Constants.LABELS_OPTION_BALANCE;
  loadMore_word: string = Constants.UI_ACTIONS_LOAD_MORE;

  origin_cards$ = new BehaviorSubject<Card[]>([]);
  movements$ = new BehaviorSubject<Movement[]>([]);
  total$ = new BehaviorSubject<number>(0);
  selectedCardId$ = new BehaviorSubject<string>('');
  selectedCard$ : Observable<Card | null | undefined> | null = null;
  shouldLoadMore$ : Observable<boolean> | undefined;

  
  totalMovementsNumber: number = 0;
  currentOffset: number = 0;

  //definisce quanti movimenti devono essere mostrati ogni volta che si clicca "Carica altro"
  movementsToShowInterval: number = 5;


  constructor(private cardsService: CardsService,
             private activatedRoute : ActivatedRoute){}


  ngOnInit(): void {

    this.getCards();
    this.getCardBySelectedCardId();
    this.setCardMovements(); 
    this.getTotalNumberOfMovements();
    this.setIfShouldLoadMore();
    this.getTotalMovementsNumber();
    this.setSelectedCardIdFromRoute();
  }


  getCards(){
    this.cardsService.getCards().subscribe(this.origin_cards$);
  }

  setSelectedCardIdFromSelect(cardId: string){
    this.selectedCardId$.next(cardId)
  }

  setSelectedCardIdFromRoute() {
    this.activatedRoute.params.subscribe(params => {
      if(params.cardId){
        this.selectedCardId$.next(params.cardId)
      }
    })
  }  

  getCardBySelectedCardId(){
    this.selectedCard$ = combineLatest([this.origin_cards$, this.selectedCardId$])
    .pipe(
      map(([cards, cardIdSelected]) => { 
          return cards.find(card => card._id === cardIdSelected)}
       ))
  }
  
  getTotalMovementsNumber() {
    this.total$.subscribe(total => {this.totalMovementsNumber = total})
  }


  getTotalNumberOfMovements() {

    const totalMovementsNumber$ = this.selectedCard$!.pipe(
      switchMap((card) => this.cardsService.getMovementsByCardId(card?._id!, 0, 0).pipe(
        map(movements_metadata => movements_metadata.total)
      )))
      totalMovementsNumber$?.subscribe(this.total$)
  }


  setCardMovements() {
    const movements$ = this.selectedCard$!.pipe(
      switchMap((card) => this.cardsService.getMovementsByCardId(card?._id!, 0, this.movementsToShowInterval).pipe(
        map(movements_metadata => movements_metadata.data),
        catchError(() => EMPTY)
      )))
      movements$?.subscribe(movs => {
                                      this.movements$.next(movs)
                                      this.resetOffset()
                                    })
  
  }

  setIfShouldLoadMore(){
    this.shouldLoadMore$ = combineLatest([this.selectedCardId$, this.total$])
                            .pipe( map(([cardId, total]) => {
                              return cardId && (this.currentOffset + this.movementsToShowInterval < total) ? true : false
                            }
                           ))   
  }


  loadMore() {

    this.calculateOffset()
    let cardId = this.selectedCardId$.getValue()
    if(cardId) {
      let tempMovements$ = this.cardsService.getMovementsByCardId(cardId, this.currentOffset, this.movementsToShowInterval)
          .pipe(
              map(movements_metadata => movements_metadata.data)
        )
     tempMovements$.subscribe(values => this.movements$.next([...this.movements$.getValue(), ...values])) 
     this.setIfShouldLoadMore();
    }

  }


  resetOffset() {
   this.currentOffset = 0;
  }

  calculateOffset() {
    this.currentOffset = (this.currentOffset + this.movementsToShowInterval) <= this.totalMovementsNumber ?
                          this.currentOffset + this.movementsToShowInterval :
                         (this.totalMovementsNumber - this.currentOffset) + this.currentOffset;
  }

}
