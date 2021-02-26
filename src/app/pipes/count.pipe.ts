import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(value: number[], ...args: unknown[]): number {

     let count = 0;

     value.forEach(element => {
      if(element <= 0 || undefined){
      }else{
        count++
      }
    });

    return count;
  }

}
