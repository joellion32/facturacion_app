import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], text: String, column: string): any {
    // verificar si el texto no tiene ningun valor
    if (text === '') {
      return array;
    }

    text = text.toLowerCase();

    // hacer la busqueda
    return array.filter(item => {
      console.log(item);
      return item[column].toLowerCase().includes(text);
    });
  }

}
