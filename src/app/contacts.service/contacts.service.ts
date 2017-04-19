import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Contacts} from "../contact-list/Contacts";


@Injectable()
export class ContactsService {

  private apiUrl = 'http://localhost:4500';

  constructor(private http: Http) {
  }

  getContacts(): Observable<Contacts[]> {

    return this.http.get(this.apiUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateContacts(updated): Observable<Contacts[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + '/update', updated, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || { };

  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);

  }


}
