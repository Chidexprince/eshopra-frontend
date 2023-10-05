import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/service/product.service';
import { ProductCategoryService } from '../product/service/product-category.service';
import { Product } from 'src/app/shared/models/product';
import { ProductCategory } from 'src/app/shared/models/product-category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loader = false;
  products: Product[] = [];
  productCategory: ProductCategory[] = [];

  constructor(private productService: ProductService, 
   private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.getProductCategory();
    this.getProductList();
  }

  getProductList() {
    this.loader = true;
    this.productService.getProducts()
    .subscribe(data  => {
      this.loader = false;
      this.products = data
    }, error => {
      console.log(error.message)
      this.loader = false;
    })
  }

  getProductCategory() {
    this.loader = true;
    this.productCategoryService.getProductCategory()
    .subscribe(data  => {
      this.productCategory = data
      console.log(data)
    }, error => {
      console.log(error.message)
    })
  }

  getProductsByCategory(categoryId: number) {
    this.productCategoryService.getProductsByCategoryId(categoryId)
    .subscribe(data  => {
      this.loader = false;
      this.products = [];
      this.products = data
      console.log(data)
    }, error => {
      this.loader = false;
      console.log(error.message)
    })
  }

}
