import { Constants } from 'src/app/shared/utils/constants';
import { Component, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Map, MapOptions, tileLayer, latLng, LatLng, Marker, icon } from 'leaflet'
import { LocationCoordinates } from 'src/app/models/location-coordinates';


@Component({
  selector: 'location-map',
  templateUrl: './location-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationMapComponent implements OnDestroy {

 
  @Input() customCoordinates: LocationCoordinates = {
    latitude: 0,
    longitude: 0
  }
  
  @Input() options: MapOptions= {
                      layers:[tileLayer(Constants.LOCATIONS_TILE_LAYER_URL, {
                        opacity: 0.7,
                        maxZoom: 19,
                        detectRetina: true
                      })],
                      zoom:17,
                    
  };

  constructor() { }
  public map!: Map;
  public zoom: number | undefined;


  ngOnInit(): void {
    this.initializeMapOptions();
  }

  private initializeMapOptions() {
    this.options = {
      center: latLng(0, 0),
      layers:[tileLayer(Constants.LOCATIONS_TILE_LAYER_URL, {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true
      })],
      zoom:17,
    };
  }

  changeLocation(){
    this.map?.panTo(new LatLng(this.customCoordinates?.latitude, this.customCoordinates?.longitude));
    this.setDefaulZoom();
    this.addSampleMarker(this.customCoordinates?.latitude, this.customCoordinates?.longitude);
  }

  setDefaulZoom(){
    this.map?.setZoom(17)
  }

  ngOnDestroy() {
    this.map?.clearAllEventListeners;
  };

  onMapReady(map: Map) {
    this.map = map;
  }



 private addSampleMarker(latMarker: number, longMarker: number) {
    const marker = new Marker([latMarker, longMarker])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        }));
    marker.addTo(this.map);
  } 
}
