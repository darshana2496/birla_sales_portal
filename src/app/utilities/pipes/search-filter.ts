import { Pipe, PipeTransform } from '@angular/core';
import { ITdsDocuments } from '../constants/commonInterface';

@Pipe({
  name: 'searchFilterPipe',
})
export class SearchFilterPipe implements PipeTransform {
  transform(listToSearch: ITdsDocuments[], searchTerm: string): ITdsDocuments[] {
    if (!listToSearch || !searchTerm) {
      console.log(searchTerm);
      return listToSearch;
    }

    return listToSearch.filter(it => {
      console.log(it);
      return it.vcFilename.toLowerCase().includes(searchTerm.toLowerCase()) || it.vcUploadedOn.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
