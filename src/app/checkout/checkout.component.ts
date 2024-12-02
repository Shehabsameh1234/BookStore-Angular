import { Component } from '@angular/core';
import { BasketService } from '../shared/services/basket.service';
import { Item } from '../shared/interfaces/basket';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderAddress } from '../shared/interfaces/order';
import { OrderService } from '../shared/services/order.service';
import { DeliveryMethod } from '../shared/interfaces/delivery-methods';
import { PaymentService } from '../shared/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  selectedOption: number = 4;
  userEmail!: any
  numberOfItems!: any
  items!: Item[]
  totalAmount!: number
  isAdrressTaken: boolean = false
  isMethodTaken: boolean = false
  OrderAddress!: OrderAddress
  deliveryMethodId!: number
  methods!: DeliveryMethod[]
  methodsLength!: number
  isPaying:boolean=false
  constructor(private _BasketService: BasketService, private _orderService: OrderService, private _PaymentService: PaymentService,private _Router:Router) {

  }
  ngOnInit() {
    localStorage.setItem("prevUrl",document.URL)
    this.numberOfItems = this._BasketService.numberOfItems.getValue()
    document.getElementById("navbar")?.classList.add("d-none")
    this.userEmail = localStorage.getItem("userEmail")

    this._orderService.getDeliveryMethods().subscribe({
      next: (res) => {
        this.methods = res
        this.methodsLength = res.length
      },
      error: (error) => {
      }
    })
    this._BasketService.items.subscribe(() => {
      this.items = this._BasketService.items.getValue()
    })
    if(this.items==null || this.items.length==0){this._Router.navigate(['/notFound'])};
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
  saveOrderAddress(orderForm: FormGroup) {
    this.OrderAddress = orderForm.value
    this.isAdrressTaken = true
  }
  createOrder() {
    this.isPaying=true
    this._orderService.createOrder(this.OrderAddress, this.selectedOption).subscribe({
      next: (res) => {
        this._PaymentService.payOrder(res.id).subscribe({
          next: (res) => {
            window.location.href =res.url
          }
        })
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  ngOnDestroy(): void {
    document.getElementById("navbar")?.classList.remove("d-none")
  }
}
