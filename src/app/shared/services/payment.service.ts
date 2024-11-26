import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl: string = environment.apiUrl;
  private token: string | null = localStorage.getItem('userToken'); // Retrieve token once
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });
  ///Payment?orderId=25&successUrl=https://localhost:7185/swagger/index.html&cancelUrl=https://localhost:7185/api/Books
  constructor(private _HttpClient: HttpClient) { }
  payOrder(orderId: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/Payment?orderId=${orderId}&successUrl=http://localhost:4200/home/${orderId}&cancelUrl=http://localhost:4200/shop/shop`,{ headers: this.headers })
  }
}
