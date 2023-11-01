import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { LoaderComponent } from './components/loader/loader.component';
import { ProductComponent } from '../modules/product/components/product/product.component';
import { ProductCategoryComponent } from '../modules/product/components/product-category/product-category.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from '../modules/product/components/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



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
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    HttpClientModule,
    NgbModule,
    FormsModule,
    LoaderComponent,
    ProductComponent,
    ProductCategoryComponent,
    ProductDetailComponent
  ]
})
export class SharedModule { }
