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
  ifOpen:boolean=false

  constructor(private _HttpClient: HttpClient) { }

  addToBasket(productId: number): Observable<any> {
    return this._HttpClient
      .post(`${this.baseUrl}/Basket?basketId=basket&productId=${productId}`, null)
  }

  getBasket(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseUrl}/Basket?id=basket`)
  }

  deleteItem(productId: number): Observable<any> {
    return this._HttpClient
      .delete(`${this.baseUrl}/Basket/deleteItem?basketId=basket&productId=${productId}`)
  }
  //https://localhost:7185/api/Basket?basketId=basket&productId=8&quantity=5
  updateQuantity(productId: number,quantity:number): Observable<any> {
    return this._HttpClient
      .put(`${this.baseUrl}/Basket?basketId=basket&productId=${productId}&quantity=${quantity}`,null)
  }

}
