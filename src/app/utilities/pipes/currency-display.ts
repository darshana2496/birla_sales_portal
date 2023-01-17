import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyDisplay',
})
export class CurrencyDisplayPipe implements PipeTransform {
  transform(amount: string): string {
    var lastThree = amount?.substring(amount.length - 3);
    var otherNumbers = amount.substring(0, amount.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }
}
