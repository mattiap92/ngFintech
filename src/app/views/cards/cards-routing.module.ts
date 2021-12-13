import { CardsComponent } from './cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forChild([
    {path: '', component: CardsComponent}])],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
