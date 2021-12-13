import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { CardForm } from 'src/app/models/card-form';
import { equalFieldsValidator } from 'src/app/shared/validators/equal-fields.validator';
import { Constants } from 'src/app/shared/utils/constants';
import { secureCodeValidator } from 'src/app/shared/validators/secure-code.validator';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html'
})
export class CardFormComponent  {
 
  addCard_title: string = Constants.TITLES_ADD_CARD;
  cardType_label: string = Constants.LABELS_CARD_TYPE;
  name_label: string = Constants.LABELS_NAME;
  surname_label: string = Constants.LABELS_SURNAME;
  cardNumber_label: string = Constants.LABELS_CARD_NUMBER;
  secureCode_label: string = Constants.LABELS_CARD_SECURE_CODE;
  cancel_word: string = Constants.UI_ACTIONS_CANCEL;
  addCard_word: string = Constants.UI_ACTIONS_ADD_CARD;
  required_error: string = Constants.ERRORS_REQUIRED_FIELD;
  notEnoughLong_error: string = Constants.ERRORS_NOT_ENOUGH_LONG_FIELD;


  @Output() addNewCardButtonClicked = new EventEmitter<CardForm>();
  @Output() cancelButtonClicked = new EventEmitter<void>();
  typesOfCard: string[] = ["Visa", "Mastercard"]
  cardForm!: FormGroup; 
  

  constructor(private formBuilder: FormBuilder) {} 
  
  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.cardForm = this.formBuilder.group({
      type: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      surname: [null, Validators.compose([Validators.required])],
      number: [null, Validators.compose([Validators.required])],
      csc: [null, Validators.compose([Validators.required, secureCodeValidator])]
    },
    {
      validator: equalFieldsValidator('password','repeated_password')
    });
  }

  cleanUp(){
     this.cardForm?.reset();
  }
}
