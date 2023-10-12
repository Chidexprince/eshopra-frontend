import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './service/product.service';
import { ProductCategoryService } from './service/product-category.service';


@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
  ],
  providers: [ProductService, ProductCategoryService]
})
export class ProductModule { }
