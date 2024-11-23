import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

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

  createOrder(order: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/order`, null)
  }
  getDeliveryMethods(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Order/deliveryMethod`,{ headers: this.headers })
  }
}
