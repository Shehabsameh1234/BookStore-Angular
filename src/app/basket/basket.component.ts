import { Component } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import { Item } from '../shared/basket'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  items!: Item[]
  totalAmount!: number
  constructor(private _BasketService: BasketService) { }

  ngOnInit() {
    this._BasketService.getBasket().subscribe({
      next: (res) => {
        this._BasketService.items.next(res.items)
        this._BasketService.totalAmount.next(res.totalAmount)
      },
      error: (error) => {
        console.log(error);
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
      },
      error: (error) => {
        console.log(error);
      }

    })
  }

}
