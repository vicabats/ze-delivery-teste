import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageModule } from './pages/home-page/home-page.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  }, 
  {
    path: 'products',
    loadChildren: () => import('./pages/products-list-page/products-list-page.module').then(m => m.ProductsListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' }), HomePageModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
