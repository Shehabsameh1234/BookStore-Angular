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
  searchTerm:string=''


  constructor(private titleService: Title, private _BookService: BookService, private _BasketService: BasketService) {
    titleService.setTitle("home")
  }
  ngOnInit(): void {
    this._BookService.getAllBooks().subscribe({
      next: (res) => {
        console.log(res);
        
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

  addToBasket(productId: number) {
    let div = document.getElementById(`row${productId}`);
    const div2= document.getElementById(`${productId}`)
    this._BasketService.addToBasket(productId).subscribe({
      next: (res) => {
        this._BasketService.items.next(res.items)
        this._BasketService.totalAmount.next(res.totalAmount)
        this._BasketService.numberOfItems.next(res.items.length)
        setTimeout(() => {
          div = document.getElementById(`row${productId}`);
          div?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            div?.classList.add("alert-div")
          }, 200);
          setTimeout(() => {
            div?.classList.remove("alert-div")
          }, 1100);
        }, 0)
      },
      error: () => {
        div?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(()=>{
          if(div2){
            div2.classList.add("alert-div")
          }
        },500)
        setTimeout(()=>{
          if(div2){
            div2.classList.remove("alert-div")
          }
        },1500)
      }
    })
  }

}
