import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'search/:keyword', component: ProductListComponent },
    { path: 'product-category/:id', component: ProductListComponent },
    { path: 'product-detail', component: ProductDetailComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
