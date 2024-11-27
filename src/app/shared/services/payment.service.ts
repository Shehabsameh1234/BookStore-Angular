import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl: string = environment.apiUrl;
  frontUrl: string = environment.frontEndUrl;

  private token: string | null = localStorage.getItem('userToken'); // Retrieve token once
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });
  ///Payment?orderId=25&successUrl=https://localhost:7185/swagger/index.html&cancelUrl=https://localhost:7185/api/Books
  constructor(private _HttpClient: HttpClient) { }
  payOrder(orderId: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Payment?orderId=${orderId}&successUrl=${this.frontUrl}/paymentStatus/paymentStatus/${orderId}&cancelUrl=${this.frontUrl}/shop/shop`, { headers: this.headers })
  }
}
