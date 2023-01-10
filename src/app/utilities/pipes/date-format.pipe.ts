import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DATE_FMT } from '../constants/globals';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, DATE_FMT);
    }
}