import { Component } from '@angular/core';
import { BasketService } from '../shared/services/basket.service';
import { Item } from '../shared/interfaces/basket'
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  items!: Item[]
  totalAmount!: number

  constructor(private _BasketService: BasketService, private _router: Router) { }

  ngOnInit() {
    this._BasketService.getBasket().subscribe({
      next: (res) => {
        this._BasketService.items.next(res.items)
        this._BasketService.numberOfItems.next(res.items.length)
        this._BasketService.totalAmount.next(res.totalAmount)
      },
      error: (error) => {
        console.log(error);
        this._BasketService.numberOfItems.next(0)
      }
    })
    this._BasketService.items.subscribe(() => {
      this.items = this._BasketService.items.getValue()
    })
    this._BasketService.totalAmount.subscribe(() => {
      this.totalAmount = this._BasketService.totalAmount.getValue()
    })
  }
  deleteItem(productId: number) {
    this._BasketService.deleteItem(productId).subscribe({
      next: (res) => {
        this._BasketService.items.next(res.items)
        this._BasketService.totalAmount.next(res.totalAmount)
        this._BasketService.numberOfItems.next(res.items.length)
      },
      error: (error) => {
      }
    })
  }
  updateQuantity(productId: number, quantity: number) {
    if (quantity === 0) {
      this.deleteItem(productId)
      return;
    };
    const div = document.getElementById(`${productId}`)
    this._BasketService.updateQuantity(productId, quantity).subscribe({
      next: (res) => {
        this._BasketService.items.next(res.items)
        this._BasketService.totalAmount.next(res.totalAmount)
        this._BasketService.numberOfItems.next(res.items.length)
      },
      error: (error) => {
        if (div) {
          div.classList.add("alert-div")
        }
        setTimeout(() => {
          if (div) {
            div.classList.remove("alert-div")
          }
        }, 500)
      }
    })

  }


}
