import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ConvertInrPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'convertInrPipe',
})
export class ConvertInrPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    return value.toLowerCase();
  }
}
