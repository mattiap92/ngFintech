import { TaxPayerForm } from './../../../models/taxpayer-form';
import { NgControl } from '@angular/forms'
import { map, startWith } from 'rxjs/operators';
import { Component, forwardRef, InjectFlags, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { CitiesService } from 'src/app/api/cities.service';
import { City } from 'src/app/models/city';
import { Constants } from 'src/app/shared/utils/constants';



@Component({
  selector: 'taxPayer',
  templateUrl: './taxPayer.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TaxPayerComponent)
    }
  ]
})
export class TaxPayerComponent {


  taxCode_label: string = Constants.LABELS_TAX_CODE;
  surname_label: string = Constants.LABELS_SURNAME;
  name_label: string = Constants.LABELS_NAME;
  birthDate_label: string = Constants.LABELS_BIRTH_DATE;
  sex_label: string = Constants.LABELS_SEX;
  province_label: string = Constants.LABELS_BIRTH_PROVINCE;
  city_label: string = Constants.LABELS_BIRTH_CITY;
  noneOption_label: string = Constants.LABELS_OPTION_NONE;
  required_error: string = Constants.ERRORS_REQUIRED_FIELD;
  taxCodeInvalidFormat_error: string = Constants.ERRORS_INVALID_TAX_CODE_FORMAT;
  cityDoNotExist_error: string = Constants.ERRORS_CITY_DO_NOT_EXIST;


  //birthDate datePicker
  startDate = new Date(1900, 0, 1);
  todayDate = new Date();
  taxPayerForm!: FormGroup;

  @Input() disabled = false;
  ngControl: NgControl | null = null; 
  sexes: string[] = [Constants.LABELS_SEX_MALE, Constants.LABELS_SEX_FEMALE]
  origin_cities: City[] = [];
  filteredCities: Observable<City[]> | undefined | null = null
  onTouched = () => {};
  
  constructor(private formBuilder : FormBuilder,
              private citiesService: CitiesService,
              private injector: Injector){}


  ngOnInit(): void {
    this.initForm()
    this.getCities()
    this.manageFilteredCities()
    this.ngControl = this.injector.get(NgControl, null, InjectFlags.Self);
  }


  initForm(){
    this.taxPayerForm = this.formBuilder.group({
      taxCode: [null],
      surname: [null],
      name: [null],
      birthDate: [null],
      sex: [null],
      birthProvince: [null],
      birthCity: [null]
    });

  }

  errorMatcher(currentControlName: string, errorName: string, secondErrorName?: string) {
    return {
      isErrorState: () => {
          return this.taxPayerForm?.controls?.[currentControlName].touched ?
                           secondErrorName != undefined && secondErrorName != null ?  
                               (!!this.ngControl?.errors?.[errorName] || !!this.ngControl?.errors?.[secondErrorName!]) :
                                !!this.ngControl?.errors?.[errorName] : false           
      },
    };
  }

  
  writeValue(obj: TaxPayerForm): void {
    if (obj === null) {
      this.taxPayerForm.reset();
    }
    else {
      this.taxPayerForm.patchValue(obj)
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  registerOnChange(fn: any): void {
    this.taxPayerForm.valueChanges.subscribe(fn)
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  markAsTouched(): void {
    this.onTouched();
  }

  getCities(){
    this.citiesService.getCities().subscribe(cities => {
      this.origin_cities = cities
    })

  }

  manageFilteredCities(){
    this.filteredCities = this.taxPayerForm.controls.birthCity.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.nome)),
      map(nome => (nome ? this._filterCity(nome) : this.origin_cities.slice())),
    );
  } 

  displayCity(cityName: string): string {
    return cityName ? cityName : '';
  }

  private _filterCity(name: string): City[] {
    const filterValue = name.toLowerCase();
    return this.origin_cities.filter(city => city.nome.toLowerCase().includes(filterValue));
  }

  setBirthProvinceByCity(selectedCity: City) {
    this.taxPayerForm.controls.birthProvince!
      .setValue(this.origin_cities
          .filter(city => city.nome.toLowerCase().includes(selectedCity.nome.toLowerCase()))
              .map(cityMatched => cityMatched.provincia.nome).shift())
    
  }





  
  
  

}

