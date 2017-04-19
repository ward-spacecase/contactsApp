import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../contacts.service/contacts.service";
import { Contacts } from "./Contacts";
import { AddContactComponent } from "../add-contact/add-contact.component";


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

  constructor(private contactsService: ContactsService) {
      this.addContacts = [];
  }

  ngOnInit() {
    this.getContacts();
  }


  getContacts(){
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

         this.contacts.forEach(function (item, index, theArray) {

           if (contact === item) {
             theArray.splice(index, 1);
           }
         });

      this.updateDatabase();
   }

  }

  updateDatabase() {
    this.contactsService.updateContacts(this.contacts).subscribe(
      contacts => this.contacts = contacts,
      error => this.errorMessage = <any>error),
       () => this.getContacts();
  }

}
