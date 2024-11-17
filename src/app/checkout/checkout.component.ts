import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from '../shared/services/basket.service';
import { Item } from '../shared/interfaces/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  userEmail!: any
  numberOfItems!:any
  items!: Item[]
  totalAmount!:number
  constructor(private _BasketService:BasketService) {

  }
  ngOnInit() {
    this.numberOfItems=this._BasketService.numberOfItems.getValue()
    document.getElementById("navbar")?.classList.add("d-none")
    this.userEmail = localStorage.getItem("userEmail") 


    this._BasketService.items.subscribe(() => {
      this.items = this._BasketService.items.getValue()
    })
    this._BasketService.totalAmount.subscribe(() => {
      this.totalAmount = this._BasketService.totalAmount.getValue()
    })



  }

  ngOnDestroy(): void {
    document.getElementById("navbar")?.classList.remove("d-none")
  }
}
