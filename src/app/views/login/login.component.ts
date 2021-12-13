import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeHandlerService } from 'src/app/shared/utils-services/theme-handler.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent{

  appName_label: string = Constants.LABELS_APP_NAME;
  createNew_phrase: string = Constants.PHRASES_CREATE_NEW_ACCOUNT;
  useExisting_phrase: string = Constants.PHRASES_USE_EXISTING_ACCOUNT;


  myFlagForButtonToggle : boolean = true;
  isDarkThemeMode: boolean = false;
  isRegisterView: boolean = false;

  constructor(public router: Router,
              public themeHandlerService : ThemeHandlerService) { }

  ngOnInit(): void {
    this.isDarkThemeMode = this.themeHandlerService.getCurrentTheme() === "dark-theme" ? true : false;
    this.storeThemeSelection()
  }

  storeThemeSelection() {
    if(this.isDarkThemeMode) {
      this.themeHandlerService.setCurrentTheme('dark-theme')
    }
    else {
      this.themeHandlerService.setCurrentTheme('light-theme')
    }
  }

  navigateToRegister(){
    const url: string = '/' + Constants.ROOTS_LOGIN + '/' + Constants.ROOTS_REGISTER
    this.router.navigateByUrl(url)
  }

  navigateToSignIn(){
    const url: string = '/' + Constants.ROOTS_LOGIN + '/' + Constants.ROOTS_SIGNIN
    this.router.navigateByUrl(url)
  }
  
}
