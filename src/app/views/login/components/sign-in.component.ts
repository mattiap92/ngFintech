import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { Constants } from "src/app/shared/utils/constants";

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html'
  })
export class SignInComponent {

  signin_title: string = Constants.TITLES_SIGNIN;
  inserCredential_title: string = Constants.TITLES_INSERT_CREDENTIALS;
  eMail_label: string = Constants.LABELS_EMAIL;
  password_label: string = Constants.LABELS_PASSWORD;
  signin_word: string = Constants.UI_ACTIONS_SIGNIN;
  required_error: string = Constants.ERRORS_REQUIRED_FIELD;
  emailInvalidFormat_error: string = Constants.ERRORS_INVALID_EMAIL_FORMAT;

  
  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }
  
  hide = true;
  message = '';

  signInForm!: FormGroup;
  emailRegx = Constants.REGEX_EMAIL


  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
    email: [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegx)])],
    password: [null, Validators.compose([Validators.required])],
    });
    }

  onSubmit() {
    const email = this.signInForm?.controls?.email?.value
    const password = this.signInForm?.controls?.password?.value

    this.authService.login(email, password).subscribe(loginSuccess => { 
      if(loginSuccess){
        this.router.navigate(['/' + Constants.ROOTS_DASHBOARD])
      }
      else{
        this.openErrorSnackBar(Constants.SNACKBAR_AUTHENTICATION_FAIL_MESSAGE)
      }
    })
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close' , {
      duration: 3000, verticalPosition: 'top', panelClass: ['error-snack-bar']
    });
  }
  
}