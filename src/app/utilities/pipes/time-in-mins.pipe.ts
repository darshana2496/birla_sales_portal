import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GlobalConstants } from '../constants/globals';

@Pipe({
    name: 'dateFormat'
})
export class TimeInMinsFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, GlobalConstants.TIME_FMT);
    }
}