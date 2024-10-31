import { Component } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import {Item} from '../shared/basket'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  items!:Item[]
  constructor(private _BasketService: BasketService) { }

  ngOnInit() {
    // this._BasketService.getBasket().subscribe({
    //   next: (res) => {
    //     this.items=res?.items
       
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
  }

}
