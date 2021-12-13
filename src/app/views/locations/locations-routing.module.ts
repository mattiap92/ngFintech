import { LocationsComponent } from './locations.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forChild([
    {path: '', component: LocationsComponent}])],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
