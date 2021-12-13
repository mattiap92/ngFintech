import { MovementsComponent } from './movements.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forChild([
    {path: '', component: MovementsComponent},
    {path: ':cardId', component: MovementsComponent}
  ])],
  exports: [RouterModule]
})
export class MovementsRoutingModule {}
