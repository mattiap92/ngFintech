import { ThemeHandlerService } from '../../shared/utils-services/theme-handler.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStore } from 'src/app/core/services/user.store';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  appName_label: string = Constants.LABELS_APP_NAME;
  menu_label: string = Constants.LABELS_MENU;
  home_label: string = Constants.LABELS_HOME;
  cards_label: string = Constants.LABELS_CARDS;
  movements_label: string = Constants.LABELS_MOVEMENTS;
  transfer_label: string = Constants.LABELS_TRANSFER;
  appointments_label: string = Constants.LABELS_APPOINTMENTS;
  taxes_label: string = Constants.LABELS_TAXES;
  logout_label: string = Constants.LABELS_LOGOUT;

  dashboard_root: string = Constants.ROOTS_DASHBOARD;
  cards_root: string = Constants.ROOTS_CARDS;
  movements_root: string = Constants.ROOTS_MOVEMENTS;
  transfer_root: string = Constants.ROOTS_TRANSFER;
  appointments_root: string = Constants.ROOTS_APPOINTMENTS;
  taxes_root: string = Constants.ROOTS_TAXES;

  isDarkThemeMode: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public themeHandlerService : ThemeHandlerService,
              public router: Router,
              private authService: AuthService,
              public userStore: UserStore) {}


  ngOnInit(): void {
    this.isDarkThemeMode = this.themeHandlerService.getCurrentTheme() === "dark-theme" ? true : false;
    this.storeThemeSelection()
  }

  handleLogout() {
    this.authService.logout()
  }

  storeThemeSelection() {
    if(this.isDarkThemeMode) {
      this.themeHandlerService.setCurrentTheme('dark-theme')
    }
    else {
      this.themeHandlerService.setCurrentTheme('light-theme')
    }
  }



}
