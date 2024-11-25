import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { OrderAddress } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = environment.apiUrl;
  private token: string | null = localStorage.getItem('userToken'); // Retrieve token once
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });
  constructor(private _HttpClient: HttpClient) { }

  createOrder(orderAddress: OrderAddress, deliveryMethodId: number): Observable<any> {
    let Order: any = {
      deliveryMethodId: deliveryMethodId,
      basketId: orderAddress.basketId,
      OrderAddress: {
        firstName: orderAddress.firstName,
        lastName: orderAddress.lastName,
        country: orderAddress.country,
        city: orderAddress.city,
        street: orderAddress.street
      }
    }
    return this._HttpClient.post(`${this.baseUrl}/Order`, Order, { headers: this.headers })
  }
  getDeliveryMethods(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Order/deliveryMethod`, { headers: this.headers })
  }
}
