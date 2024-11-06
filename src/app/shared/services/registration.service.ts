import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registerData } from '../interfaces/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl: string = environment.apiUrl;
  constructor(private _HttpClient: HttpClient) { }
  signUp(_registerData:registerData): Observable<any>{
    return  this._HttpClient.post(`${this.baseUrl}/Account/register`, _registerData)
  }
}
