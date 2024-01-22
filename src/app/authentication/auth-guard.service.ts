import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  debugger;
  if (!authService.isLoggedIn) {
    router.navigate(['/login']);
  }
  return authService.isLoggedIn;
}
