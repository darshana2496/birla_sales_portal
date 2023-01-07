import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encryptNumberPipe',
})
export class EncryptNumberPipe implements PipeTransform {
  transform(phoneNo: string): string {
    if (phoneNo == null || phoneNo == " ") {
      return "xxxx xxxxx"
    } else {
      var newNo = phoneNo.replace(phoneNo.slice(2, 7), 'xxx xx');
      return newNo
    }
  }
}
