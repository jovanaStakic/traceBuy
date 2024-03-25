import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
 {
  path:'',
  loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes)
  }, 
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'map-modal',
    loadComponent: () => import('./map-modal/map-modal.page').then( m => m.MapModalPage)
  },
  {
    path: 'products',
    loadComponent: () => import('./productsPage/products/products.page').then( m => m.ProductsPage)
  },  {
    path: 'order-form',
    loadComponent: () => import('./order-form/order-form.page').then( m => m.OrderFormPage)
  },

  
];
