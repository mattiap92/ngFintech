import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { Constants } from 'src/app/shared/utils/constants';


@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent {

  search_label: string = Constants.LABELS_SEARCH;
  select_tooltip: string = Constants.TOOLTIPS_SELECT_CONTACT;
  edit_tooltip: string = Constants.TOOLTIPS_EDIT_CONTACT;
  remove_tooltip: string = Constants.TOOLTIPS_REMOVE_CONTACT;


  @Output() selectionIconClicked = new EventEmitter<string>();
  @Output() editIconClicked = new EventEmitter<string>();
  @Output() deleteIconClicked = new EventEmitter<string>();
  @Input() contacts: Contact[] | null = [];
  search: string = '';
}
