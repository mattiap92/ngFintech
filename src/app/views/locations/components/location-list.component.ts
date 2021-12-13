import { Location } from 'src/app/models/location';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html'
})
export class LocationListComponent  {

  locations_title: string = Constants.TITLES_LOCATIONS;

  @Output() locationClicked = new EventEmitter<string>();  
  @Input() locations: Location[] | null = [];

}
