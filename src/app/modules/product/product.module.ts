import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './service/product.service';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductCategoryService } from './service/product-category.service';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  providers: [ProductService, ProductCategoryService]
})
export class ProductModule { }
