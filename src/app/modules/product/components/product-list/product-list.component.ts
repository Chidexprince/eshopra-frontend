import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ProductCategoryService } from '../../service/product-category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductCategory } from 'src/app/shared/models/product-category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  loader = false;
  products: Product[] = [];
  productCategory: ProductCategory[] = [];

  constructor(private productService: ProductService, 
    private productCategoryService: ProductCategoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productCatId = params["id"];
      const keyword = params["keyword"];

      if(productCatId) {
        this.getProductsByCategory(productCatId);
      } else if(keyword) {
        this.findProductsByName(keyword);
      } else {
        this.getProductList();
      }
    })
    this.getProductCategory();
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

  findProductsByName(name: string) {
    this.loader = true;
    this.productService.findProductsByName(name)
    .subscribe(data  => {
      this.loader = false;
      console.log(data);
      this.products = data;
    }, error => {
      console.log(error.message)
      this.loader = false;
    })
  }

}
