import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from '../shared/services/basket.service';
import { Item } from '../shared/interfaces/basket';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderAddress } from '../shared/interfaces/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  userEmail!: any
  numberOfItems!: any
  items!: Item[]
  totalAmount!: number
  isAdrressTaken: boolean = false
  orderAddress!: OrderAddress
  constructor(private _BasketService: BasketService) {

  }
  ngOnInit() {
    this.numberOfItems = this._BasketService.numberOfItems.getValue()
    document.getElementById("navbar")?.classList.add("d-none")
    this.userEmail = localStorage.getItem("userEmail")


    this._BasketService.items.subscribe(() => {
      this.items = this._BasketService.items.getValue()
    })
    this._BasketService.totalAmount.subscribe(() => {
      this.totalAmount = this._BasketService.totalAmount.getValue()
    })

  }
  orderForm: FormGroup = new FormGroup({
    basketId: new FormControl("basket"),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
  })
  saveOrderAddress(orderForm: FormGroup){
    this.orderAddress = orderForm.value
    console.log(this.orderAddress);
    
    this.isAdrressTaken=true
  }

  createOrder(orderForm: FormGroup) {
    
  }

  ngOnDestroy(): void {
    document.getElementById("navbar")?.classList.remove("d-none")
  }
}
