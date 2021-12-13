import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { LocationMapComponent } from './components/location-map.component';
import { LocationListComponent } from './components/location-list.component';
import { LocationFormComponent } from './components/location-form.component';
import { LocationsComponent } from './locations.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ConfirmAppointmentDialogComponent } from 'src/app/core/dialogs/appointments/confirm-appointment-dialog.component';


@NgModule({
  declarations: [
    LocationsComponent,
    LocationFormComponent,
    LocationListComponent,
    LocationMapComponent,
    ConfirmAppointmentDialogComponent,
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
  ]
})
export class LocationsModule { }
