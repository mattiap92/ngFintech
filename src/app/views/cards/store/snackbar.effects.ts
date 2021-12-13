import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SnackbarActions from './snackbar.actions';
import { tap } from 'rxjs/operators';
import { SnackBarProperties } from 'src/app/models/snackbar-properties';


@Injectable()
export class SnackBarEffects {

  constructor(
    private actions: Actions,
    private snackBar: MatSnackBar) {}

  openSuccessSnackBar$ = createEffect(() => this.actions.pipe(
    ofType(SnackbarActions.openSuccessSnackBar),
    tap((props : SnackBarProperties ) => this.snackBar.open(props?.message, 'Close' , {
                                             duration: 3000, verticalPosition: 'top',
                                             panelClass: ['success-snack-bar']})
       )),{dispatch: false})
                                         
}



