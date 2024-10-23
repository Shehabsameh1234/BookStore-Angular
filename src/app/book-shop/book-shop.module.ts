import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookShopRoutingModule } from './book-shop-routing.module';
import { BookShopComponent } from './book-shop.component';
import { BookInfoComponent } from './book-info/book-info.component';


@NgModule({
  declarations: [
    BookShopComponent,
    BookInfoComponent
  ],
  imports: [
    CommonModule,
    BookShopRoutingModule
  ]
})
export class BookShopModule { }
