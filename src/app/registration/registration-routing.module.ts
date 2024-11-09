import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'login', component: LogInComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
