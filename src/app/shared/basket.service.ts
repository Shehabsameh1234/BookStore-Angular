import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl: string = environment.apiUrl;
  items: BehaviorSubject<any> = new BehaviorSubject(null)
  totalAmount: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private _HttpClient: HttpClient) { }
  // https://localhost:7185/api/Basket?basketId=basket&productId=3
  addToBasket(productId: number): Observable<any> {
    return this._HttpClient
    .post(`${this.baseUrl}/Basket?basketId=basket&productId=${productId}`,null)
  }
  // https://localhost:7185/api/Basket?id=basket
  getBasket(): Observable<any> {
    return this._HttpClient
    .get(`${this.baseUrl}/Basket?id=basket`)
  }

}
