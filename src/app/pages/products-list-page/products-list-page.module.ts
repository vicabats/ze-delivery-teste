import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListPageComponent } from './products-list-page.component';
import { RouterModule } from '@angular/router';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  declarations: [ProductsListPageComponent],
  imports: [
    CommonModule,
    ProductCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsListPageComponent
      }
    ])
  ],
  exports: [ProductsListPageComponent]
})
export class ProductsListPageModule { }
