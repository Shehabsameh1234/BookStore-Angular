import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  {path:"home",component:HomeComponent},
  { path: 'notFound', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'shop', loadChildren: () => import('./book-shop/book-shop.module').then(m => m.BookShopModule) },
  { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  {path:"**",component:NotFoundComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
