import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookShopRoutingModule } from './book-shop-routing.module';
import { BookShopComponent } from './book-shop.component';


@NgModule({
  declarations: [
    BookShopComponent
  ],
  imports: [
    CommonModule,
    BookShopRoutingModule
  ]
})
export class BookShopModule { }
