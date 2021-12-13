import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'contact-list-dialog',
    templateUrl: './contacts-dialog.component.html'
  })
export class ContactsDialogComponent {

 constructor(
    public dialogRef: MatDialogRef<ContactsDialogComponent>) {}


}