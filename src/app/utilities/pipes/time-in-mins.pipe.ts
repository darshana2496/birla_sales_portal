import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TIME_FMT } from '../constants/globals';

@Pipe({
    name: 'dateFormat'
})
export class TimeInMinsFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, TIME_FMT);
    }
}