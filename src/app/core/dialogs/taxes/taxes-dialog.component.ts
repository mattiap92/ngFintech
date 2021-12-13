import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Card } from "src/app/models/card";
import { Constants } from 'src/app/shared/utils/constants';


@Component({
    selector: 'taxes-dialog',
    templateUrl: './taxes-dialog.component.html'
  })
export class TaxesDialogComponent {


  selectionCard_phrase: string = Constants.PHRASES_CARD_SELECTION;
  cancel_word: string = Constants.UI_ACTIONS_CANCEL;
  confirm_word: string = Constants.UI_ACTIONS_CONFIRM

  cards: Card[] = []
  selectCardForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaxesDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       this.cards = data.cards;
  }

  ngOnInit(): void {
   this.initForm()
  }

  initForm(): void {
    this.selectCardForm = this.formBuilder.group({
      card: this.formBuilder.control({})
    });
  }

  onNoClick(){
    this.dialogRef.close()
  }

  onConfirmClick(){
    const cardNumberSelected = this.selectCardForm.get('card')?.value
    this.dialogRef.close(cardNumberSelected) 
  }



}