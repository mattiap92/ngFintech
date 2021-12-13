import { Slot } from './../../../types/slot';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { DayWithSlot } from 'src/app/models/day-with-slot';
import { DayWithSlots } from 'src/app/models/day-with-slots';
import { DateConverterService } from 'src/app/shared/utils-services/date-converter.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'location-form',
  templateUrl: './location-form.component.html'
})
export class LocationFormComponent  {

  dateChoice_label: string = Constants.LABELS_DATE_CHOICE;
  availableHours_phrase: string = Constants.PHRASES_AVAILABLE_HOURS;

  @Output() dateAppointmentApplied = new EventEmitter<DayWithSlot>();
  @Input() available_dates$: Observable<DayWithSlots[]> | null = null;

  available_dates:  DayWithSlots[] = [];
  dateSelectedFromPicker: DayWithSlots | undefined;
  finalDateHourAppointmentRequest: DayWithSlot = {
      day: '',
      slot: 1
  }

  @ViewChild('myDatePickerInput', {
    read: MatInput
  }) myDatePickerInput: MatInput | undefined;

  constructor(private dateConverter: DateConverterService) {}

  ngOnInit(): void {
    this.available_dates$?.subscribe(dates => this.available_dates = dates)
  }

  resetDatePickerForm() {
    if (this.myDatePickerInput) {
        this.myDatePickerInput.value = '';
        this.dateSelectedFromPicker = undefined;
    }
  }


  dateFilter: (date: Date | null) => boolean =
  (date: Date | null) => {

    const datePickerValueTime = date?.getTime();
    return this.available_dates?.some(availableDate => {
      let availableDateNative = this.dateConverter.convertStringToNativeDate(availableDate.day);
      return ((availableDateNative.getTime() === datePickerValueTime) && (availableDate.slots.length > 0));
    })

}

  manageSelectedDate(event: MatDatepickerInputEvent<Date>){
    let dateString = this.dateConverter.convertNativeDateToString(event.value!);
    this.dateSelectedFromPicker = this.available_dates?.find(dayWithSlot => dayWithSlot.day === dateString);
    this.finalDateHourAppointmentRequest.day = this.dateSelectedFromPicker?.day!;
    
  }

  finalizeAppointmentRequest(slotSelected: Slot){
    this.finalDateHourAppointmentRequest.slot = slotSelected;
    this.dateAppointmentApplied.emit(this.finalDateHourAppointmentRequest);
  }
}
