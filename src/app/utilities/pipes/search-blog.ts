import { Pipe, PipeTransform } from '@angular/core';
import { IBlogs } from '../constants/commonInterface';

@Pipe({
  name: 'searchBlogPipe',
})
export class SearchBlogPipe implements PipeTransform {
  transform(listToSearch: IBlogs[], searchTerm: string): IBlogs[] {
    if (!listToSearch || !searchTerm) {
      return listToSearch;
    }

    return listToSearch.filter(it => {
      let a = it.vcBlogDate.toLowerCase().includes(searchTerm.toLowerCase()) || it.vcCategory.toLowerCase().includes(searchTerm.toLowerCase()) || it.vcTitle.toLowerCase().includes(searchTerm.toLowerCase());
      return a;
    });
  }
}
