import { TreasuryRowForm } from './../../../models/treasuryRow-form';
import { Component, forwardRef, InjectFlags, Injector, Input } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { Constants } from 'src/app/shared/utils/constants';

@Component({
    selector: 'treasury-row',
    templateUrl: './treasury-row.component.html',
    providers: [
      { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => TreasuryRowComponent) }
    ]
  })
export class TreasuryRowComponent implements ControlValueAccessor {

  tributeCode_label: string = Constants.LABELS_TRIBUTE_CODE;
  year_label: string = Constants.LABELS_REFERENCE_YEAR;
  debitImport_label: string = Constants.LABELS_DEBIT_IMPORT;
  creditImport_label: string = Constants.LABELS_CREDIT_IMPORT;
  required_error: string = Constants.ERRORS_REQUIRED_FIELD;

  @Input() disabled = false;
  @Input() parentValidationErrors: ValidationErrors | null = null 
  treasuryForm! : FormGroup
  ngControl: NgControl | null = null;

  onTouched = () => {};

  constructor(private formBuilder : FormBuilder,
            private injector: Injector){
  
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, InjectFlags.Self);  
    this.initForm()
  }

  initForm(){
   this.treasuryForm = this.formBuilder.group({
     tributeCode: [null],
     year: [null],
     debit: [null],
     credit: [null],
   });
  }

  errorMatcher(currentControlName: string, errorName: string, secondErrorName?: string) {
    return {
      isErrorState: () => {
         return this.treasuryForm?.controls?.[currentControlName].touched ?
                         secondErrorName != undefined && secondErrorName != null ?  
                             (!!this.ngControl?.errors?.[errorName] || !!this.ngControl?.errors?.[secondErrorName!]) :
                              !!this.ngControl?.errors?.[errorName] : false           
      },
    };
  }


  writeValue(obj: TreasuryRowForm): void {
    this.treasuryForm.patchValue(obj)
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.treasuryForm.valueChanges.subscribe(fn) 
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched(): void {
    this.onTouched();
  }


}




