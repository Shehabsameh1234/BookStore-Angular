import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookShopComponent } from './book-shop.component';

const routes: Routes = [
  { path: '', redirectTo: "shop",pathMatch:"full" },
  { path: 'shop', component: BookShopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookShopRoutingModule { }
