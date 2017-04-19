import { Pipe, PipeTransform } from '@angular/core';
import {Contacts} from "./contact-list/Contacts";

@Pipe({
  name: 'nameSort'
})
export class NameSortPipe implements PipeTransform {

  transform(arr: Contacts[], args: any): Contacts[]{

    return arr.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

}
