import { ContactsService } from './../../api/contacts.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { BehaviorSubject, combineLatest, Observable, timer } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ContactsState } from 'src/app/models/contacts-state';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit{

  returnBack_word: string = Constants.UI_ACTIONS_RETURN_BACK;
  newContact_word: string = Constants.UI_ACTIONS_NEW_CONTACT;
  
  @Output() contactIsSelected = new EventEmitter<string>();
 
  origin_contacts$ : Observable<Contact[]> | null = null;
  state$ = new BehaviorSubject<ContactsState>({type: ''});
  selectedContact$ : Observable<Contact | null | undefined> | null = null

  readonly NEW: string = Constants.CONTACTS_STATE_TYPE_NEW
  readonly EDIT: string = Constants.CONTACTS_STATE_TYPE_EDIT
  readonly LIST: string = Constants.CONTACTS_STATE_TYPE_LIST


  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.setStateToListContactsMode()
    this.getContacts()
    this.getSelectedContactFromState()
  }
  
  getContacts(){
    this.origin_contacts$ = this.contactsService.getContacts()
  }


  getSelectedContactFromState(){
    this.selectedContact$ = combineLatest([this.origin_contacts$!, this.state$])
    .pipe(
      map(([contacts, state]) => { 
        if(state.type === this.EDIT){
            return contacts.find(contact => contact._id === state.id);
        }
        return null;
        }))
  }

  shareSelectedContact(contactSelectedFromListId: string){
    this.origin_contacts$?.pipe(map(contacts => contacts.find(contact => contact._id === contactSelectedFromListId)))
    .subscribe(contact => this.contactIsSelected.emit(contact?._id))
   
  }


  setStateToListContactsMode(){ 
    this.state$.next({type: this.LIST})
  }


  setStateToNewContactMode(){ 
    this.state$.next({type: this.NEW})
  }

  setStateToEditContactMode(contactToEditId: string){ 
    this.state$.next({type: this.EDIT, id: contactToEditId})
  }


  deleteContact(contactIdSelected : string){
      this.contactsService.deleteContact(contactIdSelected).subscribe(() =>  this.getContacts());
  }

  saveContactFormClicked(form : FormGroup) {
     const contactFormData = form.value

     this.state$.pipe(filter(state => state.type === this.EDIT), map(state => {
      const contactEdited : Partial<Contact> = {
        _id: state.id,
        name: contactFormData.name,
        surname: contactFormData.surname,
        iban: contactFormData.iban,
      }
      return contactEdited
     }), switchMap(contactEdited => this.contactsService.updateContact(contactEdited)),
         takeUntil(timer(250))).subscribe(() =>  {
           this.setStateToListContactsMode()})
   

     this.state$.pipe(filter(state => state.type === this.NEW), map(state => {
      const newContact : Partial<Contact> = {
        name: contactFormData.name,
        surname: contactFormData.surname,
        iban: contactFormData.iban,
      }
      return newContact
     }), switchMap(newContact => this.contactsService.addContact(newContact)),
         takeUntil(timer(250))).subscribe(() =>  {
          this.setStateToListContactsMode()})
  
 
  }
  
  
}
