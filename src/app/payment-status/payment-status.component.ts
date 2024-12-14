import { Component } from '@angular/core';
import { BasketService } from '../shared/services/basket.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { Order, OrderAddress, OrderItem } from '../shared/interfaces/order';
import { PaymentService } from '../shared/services/payment.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent {
  id!: any
  order!: any
  items!: OrderItem[]
  deliveryAddress!: OrderAddress | null;
  constructor(private _paymentService: PaymentService, private _router: Router, private _BasketService: BasketService, private titleService: Title, private _activatedRoute: ActivatedRoute, private _orderService: OrderService) {
    titleService.setTitle("Payment succeeded")
  }
  ngOnInit(): void {
    if (localStorage.getItem("prevUrl") == null) { this._router.navigate(['/notFound']); return }
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this._orderService.updateOrderStaus(this.id).subscribe({
      next: (res) => {
        this.order = res
        this.deliveryAddress = res.orderAddress
        this.items = res.orderItems
      },
      error: () => {
        this._router.navigate(['/notFound']); return
      }
    })
    this._paymentService.sendEmail(this.id).subscribe({
      next: () => { },
      error: () => { this._router.navigate(['/notFound']); return }
    })
    this._BasketService.deleteAllItems().subscribe({
      next: () => {
        this._BasketService.items.next(null)
        this._BasketService.totalAmount.next(0)
        this._BasketService.numberOfItems.next(0)
      },
    })

  }
  ngOnDestroy() {
    localStorage.removeItem("prevUrl")
  }
}
