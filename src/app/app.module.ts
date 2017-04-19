import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactsService } from './contacts.service/contacts.service';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NameSortPipe } from './name-sort.pipe';
import { AddContactComponent } from './add-contact/add-contact.component';
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    NameSortPipe,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    TextMaskModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
