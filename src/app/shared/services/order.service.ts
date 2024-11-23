import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = environment.apiUrl;
  constructor(private _HttpClient: HttpClient) { }
  //https://localhost:7185/api/Order
  createOrder(order:any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/order`,null) }
}
