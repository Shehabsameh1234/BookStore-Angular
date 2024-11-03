import { Component } from '@angular/core';

import { Books } from '../shared/books';
import { BookService } from '../shared/book.service';
import { BasketService } from '../shared/basket.service';


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
  book!: any

  constructor(private _BookService: BookService, private _BasketService: BasketService) { 

  }
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
  getNextPage() {
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
  getPreviousPage() {
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
  getBook(bookid: number) {
    this._BookService.getBook(bookid).subscribe({
      next: (res) => {
        this.book = res
      },
      error: () => {
        this.ifError = true
      }
    })
  }

  addToBasket(productId:number) {
    this._BasketService.addToBasket(productId).subscribe({
      next: (res) => {
        this._BasketService.items.next(res.items)
        this._BasketService.totalAmount.next(res.totalAmount)
      },
      error: (error) => {
        alert(error.error.messege);
      }
    })
  }
}
