import { Component, forwardRef, InjectFlags, Injector, Input } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { InpsRowForm } from "src/app/models/inpsRow-form";
import { Constants } from "src/app/shared/utils/constants";

@Component({
    selector: 'inps-row',
    templateUrl: './inps-row.component.html',
    providers: [
      { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => InpsRowComponent)}
    ]
  })
export class InpsRowComponent implements ControlValueAccessor {


  siteCode_label: string = Constants.LABELS_SITE_CODE;
  contributionCausal_label: string = Constants.LABELS_CONTRIBUTION_CAUSAL;
  inpsCode_label: string = Constants.LABELS_INPS_CODE;
  fromDate_label: string = Constants.LABELS_FROM_DATE;
  toDate_label: string = Constants.LABELS_TO_DATE;
  debit_label: string = Constants.LABELS_DEBIT;
  credit_label: string = Constants.LABELS_CREDIT;
  required_error: string = Constants.ERRORS_REQUIRED_FIELD;
  fromDateIsAfterToDate_error: string = Constants.ERRORS_FROM_DATE_IS_AFTER_TO_DATE;
  

  @Input() disabled = false;
  @Input() parentValidationErrors: ValidationErrors | null = null 
  inpsForm!: FormGroup;
  ngControl: NgControl | null = null;

  onTouched = () => {};
  constructor(private formBuilder : FormBuilder,
              private injector: Injector){

  }
  
  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, InjectFlags.Self);
    this.initForm();  
  }

  initForm(){  this.inpsForm = this.formBuilder.group({
    siteCode: [null],
    contributionCausal: [null],
    inpsCode: [null],
    fromDate: [null],
    toDate: [null],
    debit: [null],
    credit: [null],
    });
  }

  errorMatcher(currentControlName: string, errorName: string, secondErrorName?: string) {
    return {
      isErrorState: () => {
          return this.inpsForm?.controls?.[currentControlName].touched ?
                           secondErrorName != undefined && secondErrorName != null ?  
                               (!!this.ngControl?.errors?.[errorName] || !!this.ngControl?.errors?.[secondErrorName!]) :
                                !!this.ngControl?.errors?.[errorName] : false           
      },
    };
  }



  writeValue(obj: InpsRowForm): void {
    this.inpsForm.patchValue(obj)
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.inpsForm.valueChanges.subscribe(fn)
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  markAsTouched(): void {
    this.onTouched();
  }
  
}