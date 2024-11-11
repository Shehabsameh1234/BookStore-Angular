import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/shared/services/book.service';
import { Books } from 'src/app/shared/interfaces/books';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent {

  id!: any
  book!: any


  constructor(private _ActivatedRoute: ActivatedRoute, private _BookService: BookService, private _BasketService: BasketService) { }

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
  addToBasket(productId: number) {
    let div = document.getElementById(`row${productId}`);
    const div2 = document.getElementById(`${productId}`)
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
        setTimeout(() => {
          if (div2) {
            div2.classList.add("alert-div")
          }
        }, 500)
        setTimeout(() => {
          if (div2) {
            div2.classList.remove("alert-div")
          }
        }, 1500)
      }
    })
  }

}
