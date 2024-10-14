import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{environment}from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl: string = environment.apiUrl;
  constructor(private _HttpClient:HttpClient ) { }
  getAllBooks(pageIndex:number=1,pageSize:number=4):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/Books?pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }
  getCategories():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/Books/categories`)
  }
  getByCategory(pageIndex:number=1,pageSize:number=4,categoryId:number):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/Books?pageIndex=${pageIndex}&pageSize=${pageSize}&CategoryId=${categoryId}`)
  }
}
