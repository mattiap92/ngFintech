import { Constants } from 'src/app/shared/utils/constants';
import { CardIdValidator } from './../../shared/validators/card-id.validator';
import { TransferErrorStateMatcher, TransferValidator } from './../../shared/validators/transfer.validator';
import { Transfer } from './../../models/transfer';
import { TransferService } from './../../api/transfer.service';
import { CardsService } from './../../api/cards.service';
import { ContactsService } from './../../api/contacts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { ContactsDialogComponent } from 'src/app/core/dialogs/transfer/contacts-dialog.component';
import { amountValidator } from 'src/app/shared/validators/amount.validator';
import { ibanValidator } from 'src/app/shared/validators/iban.validator';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html'
})
export class TransferComponent implements OnInit {

 
  name_label: string = Constants.LABELS_NAME;
  surname_label: string = Constants.LABELS_SURNAME;
  iban_label: string = Constants.LABELS_IBAN;
  amount_label: string = Constants.LABELS_AMOUNT;
  selectCard_label: string = Constants.LABELS_SELECT_CARD;
  contactList_word: string = Constants.UI_ACTIONS_CONTACT_LIST;
  transferMoney_word: string = Constants.UI_ACTIONS_TRANSFER_MONEY;
  required_error: string = Constants.ERRORS_REQUIRED_FIELD;
  ibanInvalidFormat_error: string = Constants.ERRORS_INVALID_IBAN_FORMAT;
  notNumber_error: string = Constants.ERRORS_IS_NOT_A_NUMBER;
  notEnoughMoney_error: string = Constants.ERRORS_NOT_ENOUGH_MONEY;
  cardDoNotExist_error: string = Constants.ERRORS_CARD_DO_NOT_EXIST;

  transferForm!: FormGroup; 
  origin_cards$ = new BehaviorSubject<Card[]>([]);
  transferErrorMatcher = new TransferErrorStateMatcher();

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private contactsService: ContactsService,
              private cardsService: CardsService,
              private transferService: TransferService,
              private transferValidator: TransferValidator,
              private cardIdValidator : CardIdValidator,
              private formBuilder: FormBuilder) {}



  ngOnInit(): void {
    this.initForms()
    this.getCards()
  }

  initForms(): void {
    this.transferForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      surname: [null, Validators.compose([Validators.required])],
      iban: [null, Validators.compose([Validators.required, ibanValidator])],
      amountCardIdGroup: this.formBuilder.group({
        amount: [null, Validators.compose([Validators.required, amountValidator])],
        cardId: [null, Validators.compose([Validators.required]), this.cardIdValidator.existingCardWithGivenId()]
      },
      {
        asyncValidators: this.transferValidator.thereIsEnoughMoney()
      })
    });
   }

  getCards(){
    this.cardsService.getCards().subscribe(this.origin_cards$);
   }


  openDialog(): void {
    const dialogRef = this.dialog.open(ContactsDialogComponent, {
      width: '700px'
    });

   const contactSelectedInDialog$ = dialogRef.afterClosed().pipe(
      switchMap(contactIdSelected => this.contactsService.getContacts().pipe(
        map(contacts => contacts.find(contact => contact._id === contactIdSelected) || null)
      )))
      
   contactSelectedInDialog$.subscribe(contactSelected => {
      this.transferForm.patchValue({
        name: contactSelected?.name,
        surname: contactSelected?.surname,
        iban: contactSelected?.iban
      })
    })
    
  }


  manageTransfer(form: FormGroup){
    const transfer: Transfer = {
      name: form.get('name')?.value,
      surname: form.get('surname')?.value,
      iban: form.get('iban')?.value,
      amount: form.get('amountCardIdGroup.amount')?.value,
      cardId: form.get('amountCardIdGroup.cardId')?.value,
    }
 
    this.transferService.transferMoney(transfer).subscribe(() => {
      this.cleanForm();
      this.openSnackBar(Constants.SNACKBAR_TRANSFER_SUCCESS_MESSAGE)})
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close' , {
      duration: 3000, verticalPosition: 'top',
      panelClass: ['success-snack-bar']
    });
  }

  cleanForm(){
    this.transferForm.reset()
    Object.keys(this.transferForm.controls).forEach(key => {
       this.transferForm?.get(key)?.setErrors(null);
       this.transferForm?.get(key)?.get('amount')?.setErrors(null);
       this.transferForm?.get(key)?.get('cardId')?.setErrors(null);
    });
  }

}


