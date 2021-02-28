import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterPipe'
})

export class FilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    return list ? list.filter(item =>
      (item.name.toLowerCase().search(new RegExp(filterText.toLowerCase())) > -1) ||
      (item.description.toLowerCase().search(new RegExp(filterText.toLowerCase())) > -1)) : [];
  }
}
