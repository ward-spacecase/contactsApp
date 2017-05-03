import { Component, OnInit } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public person = {
    name: '',
    email: '',
    phone: ''
  };

  public mask: Array<string | RegExp>;

  constructor(private listView: ContactListComponent) {
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  }

 ngOnInit(){

 }

 cancel(){

   this.listView.addContacts = [];
   this.person = {
     name: '',
     email: '',
     phone: ''
   }
 }

 submit() {
   this.listView.pushContactTo(this.person);
   this.cancel();
 }



}
