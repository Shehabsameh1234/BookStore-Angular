import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookShopComponent } from './book-shop.component';
import { BookInfoComponent } from './book-info/book-info.component';

const routes: Routes = [
  { path: '', redirectTo: "shop",pathMatch:"full" },
  { path: 'shop', component: BookShopComponent },
  { path: 'bookinfo/:id', component: BookInfoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookShopRoutingModule { }
