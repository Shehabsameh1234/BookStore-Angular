import { Component } from '@angular/core';

import { Books } from '../shared/books';
import { BookService } from '../shared/book.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books!: Books[]
  ifError: boolean = false
  numberOfPages!: number
  pageIndex!: number

  constructor(private _BookService: BookService) { }
  ngOnInit(): void {

    this._BookService.getAllBooks().subscribe({
      next: (res) => {
        this.books = res.data
        this.pageIndex = res.pageIndex
        this.numberOfPages = Math.ceil(res.count / res.pageSize)
      },
      error: () => {
        this.ifError = true
      }
    })
  }

  reloadPage() {
    location.reload()
  }

  getPgaeByNumber(pageNumber: number) {
    this._BookService.getAllBooks(pageNumber).subscribe({
      next: (res) => {
        this.books = res.data
        this.pageIndex = res.pageIndex
      },
      error: () => {
        this.ifError = true
      }
    })
  }
  getNextPage()
  {
    this.pageIndex++
    this._BookService.getAllBooks(this.pageIndex).subscribe({
      next: (res) => {
        this.books = res.data
        this.pageIndex = res.pageIndex
      
      },
      error: () => {
        this.ifError = true
      }
    })
  }
  getPreviousPage()
  {
    this.pageIndex--
    this._BookService.getAllBooks(this.pageIndex).subscribe({
      next: (res) => {
        this.books = res.data
        this.pageIndex = res.pageIndex
      
      },
      error: () => {
        this.ifError = true
      }
    })
  }
}
