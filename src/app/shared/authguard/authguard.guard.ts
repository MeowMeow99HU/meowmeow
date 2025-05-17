import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';
import {routes} from '../../app.routes';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if(user){
        return true;
      }

      console.log("Not authenticated");
      return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    })
  );
};

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (!user) {
        return true;
      }

      console.log('Already authenticated, redirecting to home');
      return router.createUrlTree(['/home'], {
        queryParams: { returnUrl: state.url }
      });
    })
  );
};
