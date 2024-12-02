import { Component } from '@angular/core';
import { BasketService } from '../shared/services/basket.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent {
  id!: any
  constructor(private _BasketService: BasketService, private titleService: Title, private _activatedRoute: ActivatedRoute, private _orderService: OrderService) {
    titleService.setTitle("Payment succeeded")
  }
  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');

    this._orderService.updateOrderStaus(this.id).subscribe({
      next:(res)=>{console.log(res);},
      error:(error)=>{console.log(error);}
    })
    this._BasketService.deleteAllItems().subscribe({
      next: () => {
        this._BasketService.items.next(null)
        this._BasketService.totalAmount.next(0)
        this._BasketService.numberOfItems.next(0)
      },
    })

  }
}
