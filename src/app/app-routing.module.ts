import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  {path:"home",component:HomeComponent},
  {path:"shop",component:ShopComponent},
  { path: 'notFound', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  {path:"**",component:NotFoundComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
