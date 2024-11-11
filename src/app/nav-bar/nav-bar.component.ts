import { Component } from '@angular/core';
import { BasketService } from '../shared/services/basket.service';
import { RegistrationService } from '../shared/services/registration.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  numberOfItems!: number
  isLogin!:boolean
  constructor(private _BasketService: BasketService,private _RegistrationService:RegistrationService) { }
  ngOnInit(): void {
    this._BasketService.numberOfItems.subscribe(() => {
      this.numberOfItems = this._BasketService.numberOfItems.getValue()
    })
    this._RegistrationService.isLogin.subscribe(() => {
      this.isLogin = this._RegistrationService.isLogin.getValue()
    })
    if(localStorage.getItem("userToken")!=null){
      this.isLogin=true
    }
    else this.isLogin=false
  }
  logOut()
  {
    localStorage.removeItem("userToken")
    this._RegistrationService.isLogin.next(false)
   
  }
}
