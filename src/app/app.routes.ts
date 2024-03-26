import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs']);

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    ...canActivate(redirectLoggedInToHome)
  },
  
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage),
    
  },
 {
  path:'',
  loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  ...canActivate(redirectUnauthorizedToLogin)
  }, 
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'map-modal',
    loadComponent: () => import('./map-modal/map-modal.page').then( m => m.MapModalPage),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'products',
    loadComponent: () => import('./productsPage/products/products.page').then( m => m.ProductsPage),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'order-form',
    loadComponent: () => import('./order-form/order-form.page').then( m => m.OrderFormPage),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'details-modal',
    loadComponent: () => import('./details-modal/details-modal.page').then( m => m.DetailsModalPage),
    ...canActivate(redirectUnauthorizedToLogin)
  },

  
];
