import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // re-run the pipe whenver the data changes on the page leading to the performance issues
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string): unknown {
    if( value.length === 0 || filterString === "") {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      if (item === filterString){
        resultArray.push(item)
      }
    }
    
    return resultArray;
  }

}
