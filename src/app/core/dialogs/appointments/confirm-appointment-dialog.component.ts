import { Constants } from './../../../shared/utils/constants';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DayWithSlot } from 'src/app/models/day-with-slot';

@Component({
  selector: 'app-confirm-appointment',
  templateUrl: './confirm-appointment-dialog.component.html'
})
export class ConfirmAppointmentDialogComponent {

  confirm_phrase: string = Constants.PHRASES_CONFIRM_APPOINTMENT;
  cancel_word: string = Constants.UI_ACTIONS_CANCEL;
  confirm_word: string = Constants.UI_ACTIONS_CONFIRM


  appointmentToConfirm: DayWithSlot = {
    day: '',
    slot: 1
  };

  constructor(
    public dialogRef: MatDialogRef<ConfirmAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.appointmentToConfirm = data.appointmentToConfirm;
    
  }

  onNoClick(){
    this.dialogRef.close()
  }

  onConfirmClick(){
    this.dialogRef.close({}) 
  }

}
