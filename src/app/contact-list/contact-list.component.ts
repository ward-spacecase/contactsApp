import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service/contacts.service';
import { Contacts } from './Contacts';
import { AddContactComponent } from '../add-contact/add-contact.component';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  errorMessage: string;
  contacts: Contacts[];
  mode = 'Observable';
  public addContacts;
  extraStyle: true;
  searchParams: any;
  filterBool: boolean;

  constructor(public contactsService: ContactsService) {
      this.addContacts = [];
  }

  ngOnInit() {
    this.filterBool = false;
    this.getContacts();
  }


  getContacts() {
      this.contactsService.getContacts()
        .subscribe(
          contacts => this.contacts = contacts,
          error => this.errorMessage = <any>error);

  }

  addContact() {
    if(this.addContacts[0] == null) {
      this.addContacts.push('hi');
    }

  }

  delContact(contact: object) {

   let confirmed = false;

   if(confirm("Are you sure you wish to delete this contact?") === true) {
     confirmed = true;
   }

   if(confirmed) {

     this.contactsService.delContact(contact).subscribe(
       contacts => this.contacts = contacts,
       error => this.errorMessage = <any>error),
       () => this.getContacts()

   }

  }

  pushContactTo(person) {
    this.contactsService.addContacts(person).subscribe(
      contacts => this.contacts = contacts,
      error => this.errorMessage = <any>error),
      () => this.getContacts()
  }

  search () {
    this.contactsService.search({"name": this.searchParams}).subscribe(
      contacts => this.contacts = contacts,
      error => this.errorMessage = <any>error)
  }

  filter () {
      this.filterBool = !this.filterBool;
      let pass;

      if(this.filterBool) {
          pass = 1;
      } else {
        pass = -1;
      }

    this.contactsService.filter({"name": this.searchParams, "filter": pass}).subscribe(
      contacts => this.contacts = contacts,
      error => this.errorMessage = <any>error)

  }

}
