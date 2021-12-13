import { Constants } from 'src/app/shared/utils/constants';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  { path: Constants.ROOTS_LOGIN, loadChildren: () => import('src/app/views/login/login.module').then(m => m.LoginModule )},
  {
      path: Constants.ROOTS_DASHBOARD,
      component: DashboardComponent,
      canActivate: [AuthGuard],
      children: [
        { path: Constants.ROOTS_CARDS, loadChildren: () => import('src/app/views/cards/cards.module').then(m => m.CardsModule )},
        { path: Constants.ROOTS_MOVEMENTS, loadChildren: () => import('src/app/views/movements/movements.module').then(m => m.MovementsModule )},
        { path: Constants.ROOTS_TRANSFER, loadChildren: () => import('src/app/views/transfer/transfer.module').then(m => m.TransferModule )},
        { path: Constants.ROOTS_APPOINTMENTS, loadChildren: () => import('src/app/views/locations/locations.module').then(m => m.LocationsModule )},
        { path: Constants.ROOTS_TAXES, loadChildren: () => import('src/app/views/taxes/taxes.module').then(m => m.TaxesModule )}
      ]
  },
  { path: '**', redirectTo: Constants.ROOTS_DASHBOARD, pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
