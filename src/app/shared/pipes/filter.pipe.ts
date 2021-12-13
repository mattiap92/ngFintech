import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(contacts: Contact[] | null, textToSearch: string): Contact[] {

    if (contacts == null){
      return [];
    }

    let contactsFiltered: Contact[] = [];
    
    contactsFiltered = contacts.filter(contact => ((contact.name.toLowerCase() + ' ' + contact.surname.toLowerCase())).includes(textToSearch.toLowerCase()));  

    return contactsFiltered;
  }

}
