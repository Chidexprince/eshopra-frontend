import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { LoaderComponent } from './components/loader/loader.component';
import { ProductComponent } from '../modules/product/components/product/product.component';
import { ProductCategoryComponent } from '../modules/product/components/product-category/product-category.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from '../modules/product/components/product-detail/product-detail.component';



@NgModule({
  declarations: [
    LoaderComponent,
    ProductComponent,
    ProductCategoryComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule,
    LoaderComponent,
    ProductComponent,
    ProductCategoryComponent,
    ProductDetailComponent
  ]
})
export class SharedModule { }
