import { Component } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Books } from '../shared/books';

@Component({
  selector: 'app-book-shop',
  templateUrl: './book-shop.component.html',
  styleUrls: ['./book-shop.component.css']
})
export class BookShopComponent {


  books!: Books[]
  categories!: any[]
  ifError: boolean = false
  pageSize!: number
  count!: number

  constructor(private _BookService: BookService) { }
  ngOnInit(): void {

    this._BookService.getAllBooks(1, 3).subscribe({
      next: (res) => {

        this.books = res.data
        this.pageSize = res.pageSize
        this.count = res.count
      },
      error: () => {
        this.ifError = true
      }
    })
    this._BookService.getCategories().subscribe({
      next: (res) => {
        this.categories=res
      },
      error: () => {
        this.ifError = true
      }
    })
  }

  reloadPage() {
    location.reload()
  }

  loadMore() {
    this.pageSize = this.pageSize + 3
    this._BookService.getAllBooks(1, this.pageSize).subscribe({
      next: (res) => {

        this.books = res.data
        this.pageSize = res.pageSize
      },
      error: () => {
        this.ifError = true
      }
    })
  }

}
