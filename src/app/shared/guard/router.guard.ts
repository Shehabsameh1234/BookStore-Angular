import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const routerGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router)
  if (localStorage.getItem("userToken") == null) {
    _router.navigate(['/registration/login'])
    return false
  }
  else return true
};
