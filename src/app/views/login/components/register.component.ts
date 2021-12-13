import { Constants } from 'src/app/shared/utils/constants';
import { Credentials } from './../../../models/credentials';
import { EqualFieldsErrorStateMatcher, equalFieldsValidator } from './../../../shared/validators/equal-fields.validator';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
  })
export class RegisterComponent implements OnInit{

  register_title: string = Constants.TITLES_REGISTER;
  insertData_title: string = Constants.TITLES_INSERT_DATA;
  eMail_label: string = Constants.LABELS_EMAIL;
  name_label: string = Constants.LABELS_NAME;
  surname_label: string = Constants.LABELS_SURNAME;
  password_label: string = Constants.LABELS_PASSWORD;
  repeatPassword_label: string = Constants.LABELS_REPEAT_PASSWORD;
  register_word: string = Constants.UI_ACTIONS_REGISTER;
  required_error: string = Constants.ERRORS_REQUIRED_FIELD;
  emailInvalidFormat_error: string = Constants.ERRORS_INVALID_EMAIL_FORMAT;
  passwordDoNotMatch_error: string = Constants.ERRORS_PASSWORDS_DO_NOT_MATCH;

  hide_psw = true;
  hide_repeated_psw = true;

  registerForm!: FormGroup; 
  equalFieldErrorMatcher = new EqualFieldsErrorStateMatcher();

  emailRegx = Constants.REGEX_EMAIL

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar) {} 


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegx)])],
      name: [null, Validators.compose([Validators.required])],
      surname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      repeated_password: [null, Validators.compose([Validators.required])]
    },
    {
      validator: equalFieldsValidator('password','repeated_password')
    });
  }


  onSubmit() {
    
    const credentials: Credentials = {
      email: this.registerForm?.controls?.email?.value,
      password: this.registerForm?.controls?.password?.value,
      name: this.registerForm?.controls?.name?.value,
      surname: this.registerForm?.controls?.surname?.value
    }

    this.authService.register(credentials).subscribe(() => {
        this.openSuccessSnackBar(Constants.SNACKBAR_REGISTRATION_SUCCESS_MESSAGE)
        this.router.navigate(['/'+ Constants.ROOTS_LOGIN])
    },
    errorResponse => {
      if(errorResponse.error.error) {
        this.openErrorSnackBar(errorResponse.error.error)
      }
      else {
        this.openErrorSnackBar(Constants.SNACKBAR_REGISTRATION_FAIL_MESSAGE)
      }
    })
  }
 
  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close' , {
      duration: 3000, verticalPosition: 'top', panelClass: ['success-snack-bar']
    });
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close' , {
      duration: 3000, verticalPosition: 'top', panelClass: ['error-snack-bar']
    });
  }
}




