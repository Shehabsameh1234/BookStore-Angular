import { Component, HostListener } from '@angular/core';
import { BasketService } from '../shared/services/basket.service';
import { RegistrationService } from '../shared/services/registration.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isScrolled = false;
  numberOfItems!: number
  isLogin!: boolean

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 150) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  constructor(private _BasketService: BasketService, private _RegistrationService: RegistrationService) { }
  ngOnInit(): void {
    this._BasketService.numberOfItems.subscribe(() => {
      this.numberOfItems = this._BasketService.numberOfItems.getValue()
    })
    this._RegistrationService.isLogin.subscribe(() => {
      this.isLogin = this._RegistrationService.isLogin.getValue()
    })
    if (localStorage.getItem("userToken") != null) {
      this.isLogin = true
    }
    else this.isLogin = false
  }
  logOut() {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userEmail")
    this._RegistrationService.isLogin.next(false)

  }
}
