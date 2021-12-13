import { Constants } from 'src/app/shared/utils/constants';
import { createAction, props } from "@ngrx/store";
import { SnackBarProperties } from "src/app/models/snackbar-properties";

export const openSuccessSnackBar = createAction(
    Constants.NGRX_ACTIONS_OPEN_SUCCESS_SNACKBAR,
    props<SnackBarProperties>()
  );