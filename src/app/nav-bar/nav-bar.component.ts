import { Component } from '@angular/core';
import { BasketService } from '../shared/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  numberOfItems!: number
  constructor(private _BasketService: BasketService) { }
  ngOnInit(): void {
    this._BasketService.numberOfItems.subscribe(() => {
      this.numberOfItems = this._BasketService.numberOfItems.getValue()
    })

  }
}
