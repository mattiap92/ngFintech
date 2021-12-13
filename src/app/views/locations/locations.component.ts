import { Constants } from 'src/app/shared/utils/constants';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AppointmentsService } from './../../api/appointments.service';
import { Location } from 'src/app/models/location';
import { AfterViewChecked, ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DayWithSlot } from 'src/app/models/day-with-slot';
import { DayWithSlots } from 'src/app/models/day-with-slots';
import { LocationFormComponent } from './components/location-form.component';
import { LocationMapComponent } from './components/location-map.component';
import { ConfirmAppointmentDialogComponent } from 'src/app/core/dialogs/appointments/confirm-appointment-dialog.component';
import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { LocationCoordinates } from 'src/app/models/location-coordinates';


@Component({
  selector: 'location',
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements AfterViewChecked, OnInit{
  
  private readonly destroy$ = new Subject();

  
  origin_locations$ : Observable<Location[]> | null = null;
  selectedLocationId$ = new BehaviorSubject<string>('');
  selectedLocation$ : Observable<Location | null> | null = null
  origin_day_with_slots$: Observable<DayWithSlots[]> | null = null;

  locationCoordinates: LocationCoordinates = {
    latitude: 0,
    longitude: 0
  }

  appointmentToConfirm: DayWithSlot = {
    day: '',
    slot: 1
  };

  appointmentConfirmed: DayWithSlot | null = null;


  @ViewChild('sidenavReference')
  sidenavReference : MatSidenav | undefined;

  @ViewChild('locationFormReference')
  locationForm : LocationFormComponent | undefined;

  @ViewChild('myMap')
  myMap : LocationMapComponent | undefined;
  

  constructor(public dialog: MatDialog,
             private snackBar: MatSnackBar,
             private cdRef:ChangeDetectorRef,
             private appointmentService: AppointmentsService) {}

  ngOnInit(): void {
    this.getLocations()
    this.getSelectedLocation();
    this.getDayWithSlots()
    this.handleLocationSelectedFlow();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
  
  getLocations(){
    this.origin_locations$ = this.appointmentService.getLocations()
  }

  getSelectedLocationId(selectedLocationId: string){
    this.selectedLocationId$.next(selectedLocationId)
  }

  getSelectedLocation() {
    this.selectedLocation$ = this.selectedLocationId$.pipe(
      switchMap(selectedLocationId => this.appointmentService
        .getLocations()
           .pipe(
               map(locations =>  locations.find(location => location._id == selectedLocationId) || null)
      )))
  }

  getDayWithSlots(){
    this.origin_day_with_slots$ = this.selectedLocationId$.pipe(
      switchMap(selectedLocationId => 
        {
             if(selectedLocationId != ''){
              return this.appointmentService.getSlotsByLocationId(selectedLocationId)
             }
              return EMPTY;
        }
      ))
   
  }

  handleLocationSelectedFlow() {
    this.selectedLocation$?.pipe(map(selectedLocation => {
      if(selectedLocation) {
        this.startLocationSelectedBehavior(selectedLocation)
      }
    }),takeUntil(this.destroy$)).subscribe()
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmAppointmentDialogComponent, {
      width: '700px',
      data: {
        appointmentToConfirm : this.appointmentToConfirm
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.appointmentConfirmed = this.appointmentToConfirm;
        this.resetSidenav();

        this.appointmentService.scheduleAppointment(this.appointmentConfirmed).subscribe(() => {
          this.updateAvailableDates();  //sarebbe bello!
          this.openSnackBar(Constants.SNACKBAR_APPOINTMENT_CONFIRMED_MESSAGE)
        })
   
      }
     
    });
  }

    
  getAppointmentToConfirmDetails(appointmentDateApplied: DayWithSlot){

    this.appointmentToConfirm.day = appointmentDateApplied.day;
    this.appointmentToConfirm.slot = appointmentDateApplied.slot;
    this.openDialog();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close' , {
      duration: 3000, verticalPosition: 'top',
      panelClass: ['success-snack-bar']
   });
  }

  customSidenavToggle() {
    let sidenavReferenceLocal = this.sidenavReference;
    if(!sidenavReferenceLocal?.opened){
      sidenavReferenceLocal?.open()
    }
    else{
      sidenavReferenceLocal?.close().then(() => setTimeout(function(){
        sidenavReferenceLocal?.open()
      }, 50))
    }
  }


  resetSidenav(){
    this.customSidenavToggle();
    this.locationForm?.resetDatePickerForm();
  }


  startLocationSelectedBehavior(locationSelected: Location){
    this.resetSidenav()
    this.loadMapWithLocationCoordinates(locationSelected);
  }

  
  loadMapWithLocationCoordinates(locationSelected: Location){
    this.locationCoordinates.latitude = locationSelected.coords?.[0]!
    this.locationCoordinates.longitude =  locationSelected.coords?.[1]!
    this.myMap?.changeLocation();
  }

  //TODO
  //      Non sarebbe male creare una funzione che aggiorni gli slots liberi dopo averne scelto uno,
  //      purtroppo non c'è modo di farlo perche i dati presenti in /slots/:locationId risultano ad ogni chiamata rigenerati nel server,
  //      quindi è ovviamente impossibile attuare qualcosa del genere.
  updateAvailableDates(){

  }


  
}
