import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appBirthdate]'
})
export class DateInputDirective {

    thisVal: any;
    constructor() { }

    @HostListener('keydown', ['$event']) onKeyDown(e: any) {
        var inputValue = e.target.value;
        var keycode = e.keyCode;

        var key = e.which;
        if (key == 8 || e.which == 46) {
            //Do Nothing
        } else if (key == 191 || key === 111) {
            var numChars = inputValue.length;
            if (numChars === 1) {
                let thisVal = "0" + inputValue;
                thisVal += '/';
                e.target.value = thisVal;
            } else if (numChars === 4) {
                let thisVal = inputValue;
                var b = "0";
                var position = 3;
                var output = [thisVal.slice(0, position), b, thisVal.slice(position)].join('');
                output += '/';
                e.target.value = output;
            }
        } else {
            var numChars = inputValue.length;
            if (numChars === 2 || numChars === 5) {
                var thisVal = inputValue;
                thisVal += '/';
                e.target.value = thisVal;
            }
        }

    }
}
