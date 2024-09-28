import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{environment}from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeSeriveService {
  baseUrl: string = environment.apiUrl;
  constructor(private _HttpClient:HttpClient ) { }
  getAllBooks():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/Books`)
  }
}
