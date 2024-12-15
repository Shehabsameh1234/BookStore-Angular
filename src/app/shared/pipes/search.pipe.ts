import { Pipe, PipeTransform } from '@angular/core';
import { Books } from '../interfaces/books';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(books:Books[],searchTerm:string): Books[] {
    return books.filter((book)=>book.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }

}
