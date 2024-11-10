import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/shared/services/book.service';
import { Books } from 'src/app/shared/interfaces/books';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent {

  id!: any
  book!: any


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
