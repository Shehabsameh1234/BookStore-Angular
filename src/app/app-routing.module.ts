import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { loginGuard } from './shared/guard/login.guard';
import { routerGuard } from './shared/guard/router.guard';




const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: 'notFound', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'shop', loadChildren: () => import('./book-shop/book-shop.module').then(m => m.BookShopModule) },
  { path: 'registration',canActivate:[loginGuard], loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'checkout', canActivate:[routerGuard], loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'paymentStatus', loadChildren: () => import('./payment-status/payment-status.module').then(m => m.PaymentStatusModule) },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
