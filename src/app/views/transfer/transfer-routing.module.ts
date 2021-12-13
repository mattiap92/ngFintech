import { TransferComponent } from './transfer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forChild([
    {path: '', component: TransferComponent}])],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
