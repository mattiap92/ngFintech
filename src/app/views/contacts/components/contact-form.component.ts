import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ibanValidator } from 'src/app/shared/validators/iban.validator';
import { Contact } from 'src/app/models/contact';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/utils/constants';


@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit{


  name_label: string = Constants.LABELS_NAME;
  surname_label: string = Constants.LABELS_SURNAME;
  iban_label: string = Constants.LABELS_IBAN;
  save_word: string = Constants.UI_ACTIONS_SAVE;
  required_error: string = Constants.ERRORS_REQUIRED_FIELD;
  ibanInvalidFormat_error: string = Constants.ERRORS_INVALID_IBAN_FORMAT;

  @Output() saveContactButtonClicked = new EventEmitter<FormGroup>();
  @Input() initialContact$: Observable<Contact | undefined| null> | null = null;;
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initForm()
    this.setInitialContactInFormIfExist()
  }

  initForm(){
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      surname: [null, Validators.compose([Validators.required])],
      iban: [null, Validators.compose([Validators.required, ibanValidator])]
    })
  }

  setInitialContactInFormIfExist() {
    this.initialContact$?.subscribe(initialContact => {
      if(initialContact){
          this.contactForm.patchValue(initialContact)
      }
    })

  }


} 


