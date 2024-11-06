import { Component } from '@angular/core';

import { Books } from '../shared/interfaces/books';
import { BookService } from '../shared/services/book.service';
import { BasketService } from '../shared/services/basket.service';
import { Title } from '@angular/platform-browser';


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
  isRotated:boolean=false

  constructor(private titleService: Title, private _BookService: BookService, private _BasketService: BasketService) {
    titleService.setTitle("home")
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
 
  addToBasket(productId: number,i :number) {
    const div = document.getElementById(`row${i}`);
    let originalContent = '';
    if(div){
      originalContent= div.innerHTML
    }
    this._BasketService.addToBasket(productId).subscribe({
      next: (res) => {
        this._BasketService.items.next(res.items)
        this._BasketService.totalAmount.next(res.totalAmount)
        this._BasketService.numberOfItems.next(res.items.length)
      },
      error: () => {  
        div?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (div) {
          div.innerHTML = "<h2 class='text-center'>item in basket</h2>";
        }
        setTimeout(() => {
          if (div) {
            div.innerHTML = originalContent;
          }
        }, 1000); // 1000ms = 1 second
        setTimeout(() => {
          div?.classList.add("color")
        }, 200);
        setTimeout(() => {
          div?.classList.remove("color")
        }, 1100);
      }
    })
  }

}
