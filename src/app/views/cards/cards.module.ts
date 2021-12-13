import { SnackBarEffects } from './store/snackbar.effects';
import { CardsService } from './../../api/cards.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { CardListComponent } from './components/card-list.component';
import { CardFormComponent } from './components/card-form.component';
import { CardsComponent } from './cards.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsRoutingModule } from './cards-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { cardsFeature } from './store/cards.reducer';
import { CardsEffects } from './store/cards.effects';

@NgModule({
  declarations: [
    CardsComponent,
    CardFormComponent,
    CardListComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(cardsFeature),
    EffectsModule.forFeature([CardsEffects, SnackBarEffects])
  ],
  providers: [
    CardsService
  ]
})
export class CardsModule { }
