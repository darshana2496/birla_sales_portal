import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImagePipe',
})
export class DefaultImagePipe implements PipeTransform {
  transform(image: string): string {
    // if (image == null || image == "") {
    //     return "./../assets/imgs/menu-project.jpg";
    // } else {
    //     return image;
    // }
    //return "./assets/imgs/menu-project.jpg";
    return image;
  }
}
