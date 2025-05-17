import { RouterModule, Routes } from '@angular/router';
import {publicGuard, authGuard} from './shared/authguard/authguard.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./homecontent/homecontent.component').then(m => m.HomecontentComponent)
  },
  {
    path: 'residental',
    loadComponent: () => import('./resplanscontent/resplanscontent.component').then(m => m.ResplanscontentComponent)
  },
  {
    path: 'business',
    loadComponent: () => import('./busplanscontent/busplanscontent.component').then(m => m.BusplanscontentComponent)
  },
  {
    path: 'allplans',
    loadComponent: () => import('./allplansearch/allplansearch.component').then(m => m.AllplansearchComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),

  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout.component').then(m => m.LogoutComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' } // rubber duck
];
