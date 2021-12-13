import { InpsRowForm } from "./inpsRow-form";
import { TaxPayerForm } from "./taxpayer-form";
import { TreasuryRowForm } from "./treasuryRow-form";

export interface TaxesForm {
    taxPayer: TaxPayerForm,
    treasuryRows: TreasuryRowForm[],
    inpsRows: InpsRowForm[]
}



