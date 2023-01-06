import { HostListener, Injectable } from '@angular/core';

@Injectable()
export class GlobalConstants {

static readonly DATE_FMT = 'MM/dd/yyyy';
static readonly DATE_TIME_FMT = `${GlobalConstants.DATE_FMT} hh:mm:ss`;
static readonly TIME_FMT = `mm:ss`;
notifications: any = [];

}