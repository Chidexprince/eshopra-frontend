import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { LoaderComponent } from './components/loader/loader.component';
import { ProductComponent } from '../modules/product/components/product/product.component';
import { ProductCategoryComponent } from '../modules/product/components/product-category/product-category.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoaderComponent,
    ProductComponent,
    ProductCategoryComponent
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
    ProductCategoryComponent
  ]
})
export class SharedModule { }
