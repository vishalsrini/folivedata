import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  transform(value: string): any {
    let retNumber = parseFloat(value.replace(/[^0-9.-]+/g,""));
    return isNaN(retNumber) ? 0 : retNumber;
  }
}
