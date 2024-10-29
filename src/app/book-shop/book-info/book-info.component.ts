import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/shared/book.service';
import { Books } from 'src/app/shared/books';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent {

  id!: any
  book!: Books
 


  constructor(private _ActivatedRoute: ActivatedRoute, private _BookService: BookService) { }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');
    this._BookService.getBook(this.id).subscribe({
      next: (res) => {
        this.book = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
