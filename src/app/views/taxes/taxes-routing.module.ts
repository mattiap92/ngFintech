import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxesComponent } from './taxes.component';

const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forChild([
    {path: '', component: TaxesComponent}])],
  exports: [RouterModule]
})
export class TaxesRoutingModule { }
