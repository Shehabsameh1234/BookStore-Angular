import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { logInData, registerData } from '../interfaces/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl: string = environment.apiUrl;
  isLogin: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private _HttpClient: HttpClient) { }
  signUp(_registerData:registerData): Observable<any>{
    return  this._HttpClient.post(`${this.baseUrl}/Account/register`, _registerData)
  }
  logIn(_logInData:logInData): Observable<any>{
    return  this._HttpClient.post(`${this.baseUrl}/Account/logIn`, _logInData)
  }
  
}
