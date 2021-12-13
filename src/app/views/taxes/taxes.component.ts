import { InpsRowForm } from './../../models/inpsRow-form';
import { TreasuryRowForm } from './../../models/treasuryRow-form';
import { TaxesService } from './../../api/taxes.service';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, iif, Observable, EMPTY, combineLatest, from } from 'rxjs';
import { map, reduce, startWith, switchMap } from 'rxjs/operators';
import { TaxesDialogComponent } from 'src/app/core/dialogs/taxes/taxes-dialog.component';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import { taxPayerValidator } from 'src/app/shared/validators/taxPayer.validator';
import { TaxPayerAsyncValidator } from 'src/app/shared/validators/taxPayer-async.validator';
import { treasuryRowValidator } from 'src/app/shared/validators/treasury-row.validator';
import { inpsRowValidator } from 'src/app/shared/validators/inps-row.validator';
import { TaxesForm } from 'src/app/models/taxes-form';
import { Constants } from 'src/app/shared/utils/constants';


@Component({
  selector: 'taxes',
  templateUrl: './taxes.component.html'
})
export class TaxesComponent  {


  taxPayer_label: string = Constants.LABELS_TAXPAYER;
  treasury_label: string = Constants.LABELS_TREASURY;
  inps_label: string = Constants.LABELS_INPS;
  totalDebit_label: string = Constants.LABELS_TOTAL_DEBIT;
  totalCredit_label: string = Constants.LABELS_TOTAL_CREDIT;
  totalToPay_label: string = Constants.LABELS_TOTAL_TO_PAY;
  send_word: string = Constants.UI_ACTIONS_SEND;
  creditPosition_error: string = Constants.ERRORS_CREDIT_POSITION;
  

  taxesForm!: FormGroup;
  taxPayerErrors : ValidationErrors | null = null 
  treasuryRowsErrors : ValidationErrors | null = null 
  inpsRowsErrors : ValidationErrors | null = null 


  origin_cards$ = new BehaviorSubject<Card[]>([]);
  treasuryTotal$: Observable<number> | null = null;
  treasuryCreditTotal$: Observable<number> | null = null;
  treasuryDebitTotal$: Observable<number> | null = null;
  inpsTotal$:  Observable<number> | null = null;
  inpsCreditTotal$: Observable<number> | null = null;
  inpsDebitTotal$: Observable<number> | null = null;
  totalFormBalance$: Observable<number> | null = null;

  userHaveToPay = false;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private taxesService: TaxesService,
              private cardsService: CardsService,
              private taxPayerAsyncValidator: TaxPayerAsyncValidator) {}
  

  ngOnInit(): void {
    this.initForm()
    this.getTotalFormBalance()
    this.getCards()
    this.setIfUserHaveToPay()
  }

  getCards(){
    this.cardsService.getCards().subscribe(cards => this.origin_cards$.next(cards));
  }

  initForm(): void {
    this.taxesForm = this.formBuilder.group({
      taxPayer: this.formBuilder.control({}, taxPayerValidator, this.taxPayerAsyncValidator.taxPayerAsyncValidator()),
      treasuryRows: this.formBuilder.array([]),
      inpsRows: this.formBuilder.array([])
    });
  }

  clearForm(): void {
    this.taxesForm.reset()
    this.clearTreasuryRows();
    this.clearInpsRows();
  }


  setIfUserHaveToPay(){
    this.totalFormBalance$?.subscribe(total => {
        this.userHaveToPay = total > 0 ? true : false
    })
  }

  getTotalFormBalance(){
    this.getTreasuryTotal()
    this.getInpsTotal()
    this.totalFormBalance$ =
       combineLatest(this.treasuryTotal$!, this.inpsTotal$!)
        .pipe(map(([treasuryTotal, inpsTotal]) => treasuryTotal - inpsTotal))

  }



  //Erario
  ////////////////////////////////////////////////////////////////////////////////////
  get treasuryRowsArray() {
    return this.taxesForm.get('treasuryRows') as FormArray;
  }

  addTreasuryRow() {
    this.treasuryRowsArray.push(this.formBuilder.control(null, treasuryRowValidator));
  }

  removeTreasuryRow(index: number) {
    this.treasuryRowsArray.removeAt(index);
  }

  clearTreasuryRows() {
    this.treasuryRowsArray.clear();
  }

  getTreasuryTotal(){

    this.treasuryCreditTotal$ = this.taxesForm.valueChanges
    .pipe(switchMap((form: TaxesForm)  =>
      from(form.treasuryRows)
       .pipe(
             map((treasuryRow: TreasuryRowForm) => treasuryRow?.credit || 0),
               map(credit => +credit ), //effettuo cast a 'number'
                 reduce((acc, currentCreditNumber) => acc + currentCreditNumber, 0))),
                 startWith(0))
       
    this.treasuryDebitTotal$ = this.taxesForm.valueChanges
    .pipe(switchMap((form: TaxesForm)  =>
      from(form.treasuryRows)
       .pipe(
             map((treasuryRow: TreasuryRowForm) => treasuryRow?.debit || 0),
               map(debit => +debit ),
                 reduce((acc, currentDebitNumber) => acc + currentDebitNumber, 0))),
                 startWith(0))

    this.treasuryTotal$ =
        combineLatest(this.treasuryCreditTotal$, this.treasuryDebitTotal$)
         .pipe(map(([creditSum, debitSum]) => debitSum - creditSum))
                                        
  }
  ////////////////////////////////////////////////////////////////////////////////////


  //Inps
  ////////////////////////////////////////////////////////////////////////////////////
  get inpsRowsArray() {
    return this.taxesForm.get('inpsRows') as FormArray;
  }

  addInpsRow() {
    this.inpsRowsArray.push(this.formBuilder.control(null, inpsRowValidator));
  }

  removeInpsRow(index: number) {
    this.inpsRowsArray.removeAt(index);
  }

  clearInpsRows() {
    this.inpsRowsArray.clear();
  }

  getInpsTotal(){

    this.inpsCreditTotal$ = this.taxesForm.valueChanges
    .pipe(switchMap((form: TaxesForm)  =>
      from(form.inpsRows)
       .pipe(
             map((inpsRow: InpsRowForm) => inpsRow?.credit || 0),
               map(credit => +credit ),
                 reduce((acc, currentCreditNumber) => acc + currentCreditNumber, 0))),
                 startWith(0))
       
    this.inpsDebitTotal$ = this.taxesForm.valueChanges
    .pipe(switchMap((form: TaxesForm)  =>
      from(form.inpsRows)
       .pipe(
             map((inpsRow: InpsRowForm) => inpsRow?.debit || 0),
               map(debit => +debit ),
                 reduce((acc, currentDebitNumber) => acc + currentDebitNumber, 0))),
                 startWith(0))
   
    this.inpsTotal$ =
        combineLatest(this.inpsCreditTotal$, this.inpsDebitTotal$)
        .pipe(map(([creditSum, debitSum]) => creditSum - debitSum))

  }
  ////////////////////////////////////////////////////////////////////////////////////

  manageSendButtonClicked(form: FormGroup){
    this.openDialogAndPay(form.value)
  }


  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close' , {
      duration: 3000, verticalPosition: 'top',
      panelClass: ['success-snack-bar']
    });
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close' , {
      duration: 3000, verticalPosition: 'top',
      panelClass: ['error-snack-bar']
    });
  }

  openDialogAndPay(taxesForm: TaxesForm): void {
      const dialogRef = this.dialog.open(TaxesDialogComponent, {
        width: '700px',
        data: {
          cards : this.origin_cards$.getValue()
         },
        disableClose: true
      });
    
      dialogRef.afterClosed()
      .pipe(
           switchMap(cardNumber => iif(() => cardNumber != null, 
                                        this.taxesService.payTaxes(taxesForm).pipe(
                                        map(response => ({ response, cardNumber })
                                          ),
                                        ),
                                        EMPTY
                                    )
                    )
           )
          .subscribe(result => {
             if(result?.cardNumber){
                this.clearForm();
                this.openSuccessSnackBar('Pagamento con carta: "'
                                   + result?.cardNumber
                                   + '" effettuato correttamente!')
            }
          },
           () =>  this.openErrorSnackBar(Constants.SNACKBAR_TAXES_PAYMENT_FAIL_MESSAGE))
      }

}
