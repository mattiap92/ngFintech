export class Constants {

  static REGEX_TAXCODE = /^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/;
  static REGEX_IBAN = /IT\d{2}[ ][a-zA-Z]\d{3}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{3}|IT\d{2}[a-zA-Z]\d{22}/;
  static REGEX_EMAIL = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  static LOCATIONS_TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  
  static ROOTS_HOME = 'home';
  static ROOTS_DASHBOARD = 'dashboard';
  static ROOTS_LOCATIONS = 'locations';
  static ROOTS_SLOTS = 'slots';
  static ROOTS_SCHEDULE_APPOINTMENT = 'schedule';
  static ROOTS_CARDS = 'cards';
  static ROOTS_MOVEMENTS = 'movements';
  static ROOTS_APPOINTMENTS = 'appointments';
  static ROOTS_CITIES = 'https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json';
  static ROOTS_CONTACTS = 'contacts';
  static ROOTS_TAXES = 'taxes';
  static ROOTS_TRANSFER = 'transfer';
  static ROOTS_LOGIN = 'login';
  static ROOTS_REGISTER = 'register';
  static ROOTS_SIGNIN = 'signin';
  static ROOTS_LOGOUT = 'logout';
  static ROOTS_CSRF_TOKEN = 'csrf-token';
  static ROOTS_ME = 'me';

  static TITLES_ADD_CARD = "Aggiungi carta";
  static TITLES_CARDS = "Carte";
  static TITLES_LOCATIONS = "Sedi";
  static TITLES_REGISTER = "Register";
  static TITLES_SIGNIN = "Sign In";
  static TITLES_INSERT_DATA = "Inserisci i tuoi dati";
  static TITLES_INSERT_CREDENTIALS = "Inserisci le tue credenziali";

  static TOOLTIPS_REMOVE = "Rimuovi";
  static TOOLTIPS_SHOW_MOVEMENTS = "Vedi movimenti";
  static TOOLTIPS_SELECT_CONTACT = "Seleziona";
  static TOOLTIPS_EDIT_CONTACT = "Modifica";
  static TOOLTIPS_REMOVE_CONTACT = "Rimuovi";

  static CONTACTS_STATE_TYPE_NEW = "NEW";
  static CONTACTS_STATE_TYPE_EDIT = "EDIT";
  static CONTACTS_STATE_TYPE_LIST = "LIST";

  static PHRASES_CONFIRM_APPOINTMENT = "Confermi l'appuntamento?";
  static PHRASES_CARD_SELECTION = "Seleziona la carta con cui effettuare il pagamento:";
  static PHRASES_AVAILABLE_HOURS = "Orari disponibili";
  static PHRASES_CREATE_NEW_ACCOUNT = "Crea un nuovo account";
  static PHRASES_USE_EXISTING_ACCOUNT = "Hai già un account? Accedi";

  static LABELS_APP_NAME = 'NgFintech';
  static LABELS_MENU = 'Menu';
  static LABELS_HOME = 'Home';
  static LABELS_CARDS = 'Carte';
  static LABELS_MOVEMENTS = 'Movimenti';
  static LABELS_TRANSFER = 'Trasferisci';
  static LABELS_APPOINTMENTS = 'Appuntamenti';
  static LABELS_TAXES = 'Tasse';
  static LABELS_LOGOUT = 'Logout';
  static LABELS_DATE_CHOICE = "Scegli una data";
  static LABELS_EMAIL = "E-mail";
  static LABELS_PASSWORD = "Password";
  static LABELS_REPEAT_PASSWORD = "Ripeti la password";
  static LABELS_CARD_TYPE = 'Tipo di carta';
  static LABELS_CARD_NUMBER = 'N° Carta';
  static LABELS_CARD_SECURE_CODE = 'Codice di sicurezza';
  static LABELS_NAME = 'Nome';
  static LABELS_SURNAME = 'Cognome';
  static LABELS_IBAN = 'IBAN';
  static LABELS_SEARCH = 'Cerca';
  static LABELS_SELECT_CARD = 'Seleziona una carta';
  static LABELS_OPTION_NONE = 'None';
  static LABELS_OPTION_BALANCE = 'Saldo';
  static LABELS_AMOUNT = 'Importo';
  static LABELS_TAX_CODE = 'Codice Fiscale';
  static LABELS_BIRTH_DATE = 'Data di nascita';
  static LABELS_SEX = 'Sesso';
  static LABELS_SEX_MALE = 'Maschio';
  static LABELS_SEX_FEMALE = 'Femmina';
  static LABELS_BIRTH_PROVINCE = 'Provincia di nascita';
  static LABELS_BIRTH_CITY = 'Comune di nascita';
  static LABELS_SITE_CODE = 'Codice Sede';
  static LABELS_CONTRIBUTION_CAUSAL = 'Causale contributo';
  static LABELS_INPS_CODE = 'Codice INPS';
  static LABELS_FROM_DATE = 'Da';
  static LABELS_TO_DATE = 'A';
  static LABELS_DEBIT = 'Debito';
  static LABELS_CREDIT = 'Credito';
  static LABELS_TRIBUTE_CODE = 'Codice Tributo';
  static LABELS_REFERENCE_YEAR = 'Anno di riferimento';
  static LABELS_DEBIT_IMPORT = 'Importo a debito';
  static LABELS_CREDIT_IMPORT = 'Importo a credito';

  static LABELS_TAXPAYER = 'Contribuente';
  static LABELS_TREASURY = 'Erario';
  static LABELS_INPS = 'INPS';
  static LABELS_TOTAL_DEBIT = 'Totale a debito';
  static LABELS_TOTAL_CREDIT = 'Totale a credito';
  static LABELS_TOTAL_TO_PAY = 'Totale da pagare';

  static UI_ACTIONS_CONFIRM = 'Conferma';
  static UI_ACTIONS_CANCEL = 'Annulla';
  static UI_ACTIONS_ADD_CARD = "Aggiungi carta";
  static UI_ACTIONS_ADD = "Aggiungi";
  static UI_ACTIONS_RETURN_BACK = "Indietro";
  static UI_ACTIONS_NEW_CONTACT = "Nuovo contatto";
  static UI_ACTIONS_REGISTER = "REGISTRATI";
  static UI_ACTIONS_SIGNIN = "ACCEDI";
  static UI_ACTIONS_LOAD_MORE = "Carica altro";
  static UI_ACTIONS_CONTACT_LIST = "Lista contatti";
  static UI_ACTIONS_TRANSFER_MONEY = "Trasferisci denaro";
  static UI_ACTIONS_SEND = "Invia";
  static UI_ACTIONS_SAVE = "Salva";

  static NGRX_ACTIONS_GET_ALL_CARDS = '[Cards] Get All'
  static NGRX_ACTIONS_GET_ALL_CARDS_SUCCESS= '[Cards] Get Success';
  static NGRX_ACTIONS_GET_ALL_CARDS_FAIL= '[Cards] Get Fail';
  static NGRX_ACTIONS_ADD_CARD = '[Cards] Add';
  static NGRX_ACTIONS_ADD_CARD_SUCCESS =  '[Cards] Add Success';
  static NGRX_ACTIONS_ADD_CARD_FAIL = '[Cards] Add Fail';
  static NGRX_ACTIONS_REMOVE_CARD =  '[Cards] Remove';
  static NGRX_ACTIONS_REMOVE_CARD_SUCCESS = '[Cards] Remove Success';
  static NGRX_ACTIONS_REMOVE_CARD_FAIL = '[Cards] Remove Fail';
  static NGRX_ACTIONS_OPEN_SUCCESS_SNACKBAR = '[Snackbar] Open Success';

  static SNACKBAR_ADD_CARD_SUCCESS_MESSAGE = 'New card correctly added!'
  static SNACKBAR_REMOVE_CARD_SUCCESS_MESSAGE = 'Card correctly deleted!'
  static SNACKBAR_APPOINTMENT_CONFIRMED_MESSAGE = 'Appuntamento confermato!'
  static SNACKBAR_REGISTRATION_SUCCESS_MESSAGE = 'Registrazione effettuata!'
  static SNACKBAR_REGISTRATION_FAIL_MESSAGE = 'Registrazione fallita!'
  static SNACKBAR_AUTHENTICATION_FAIL_MESSAGE = 'Autenticazione fallita!'
  static SNACKBAR_TRANSFER_SUCCESS_MESSAGE = 'Trasferimento eseguito!'
  static SNACKBAR_TAXES_PAYMENT_FAIL_MESSAGE = 'Si è verificato un errore!'

  static ERRORS_REQUIRED_FIELD = "This field is mandatory."
  static ERRORS_NOT_ENOUGH_LONG_FIELD = "it must be 3 characters long!"
  static ERRORS_INVALID_EMAIL_FORMAT = "Invalid e-mail format!"
  static ERRORS_INVALID_IBAN_FORMAT = "Invalid IBAN format!"
  static ERRORS_PASSWORDS_DO_NOT_MATCH = "Passwords do not match!"
  static ERRORS_IS_NOT_A_NUMBER = "Insert a number!"
  static ERRORS_NOT_ENOUGH_MONEY= "There is not enough money in the card!"
  static ERRORS_CARD_DO_NOT_EXIST= "The chosen card doesn't exist!"
  static ERRORS_INVALID_TAX_CODE_FORMAT = "Invalid tax code format!"
  static ERRORS_CITY_DO_NOT_EXIST= "This city do not exist!"
  static ERRORS_FROM_DATE_IS_AFTER_TO_DATE= "Ehi Marty! This isn't the DeLorean!"
  static ERRORS_CREDIT_POSITION = "Sei in una posizione di credito!"


}
