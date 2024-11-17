import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private _router:Router){

  }
  ngOnInit(){
    document.getElementById("navbar")?.classList.add("d-none")
  }

  ngOnDestroy(): void {
    document.getElementById("navbar")?.classList.remove("d-none")
  }
}
