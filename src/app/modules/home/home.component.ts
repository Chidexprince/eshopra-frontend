import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/service/product.service';
import { ProductCategoryService } from '../product/service/product-category.service';
import { Product } from 'src/app/shared/models/product';
import { ProductCategory } from 'src/app/shared/models/product-category';
import { PaginationDto } from 'src/app/shared/models/pagination-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loader = false;
  products: Product[] = [];
  productCategory: ProductCategory[] = [];
  selectedProduct!: Product;
  activeIndex: number = 0;
  currentPage!: number;
  size!: number;
  paginationDto = new PaginationDto();

  constructor(private productService: ProductService, 
   private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.initializePaginationData();
    this.getProductCategory();
    this.getProductList();
  }

  initializePaginationData() {
    this.paginationDto.currentPage = 1;
    this.paginationDto.defaultSize = 10;
    this.paginationDto.totalSize = 100;
  }

  getProductList() {
    console.log("clicked")
    this.loader = true;
    this.productService.getProducts(0, 8)
    .subscribe(data  => {
      this.loader = false;
      this.products = data.content;
      
    }, error => {
      console.log(error.message)
      this.loader = false;
    })
  }

  getProductCategory() {
    this.loader = true;
    this.productCategoryService.getProductCategory()
    .subscribe(data  => {
      this.productCategory = data.content;
      
    }, error => {
      console.log(error.message)
    })
  }

  getProductsByCategory(categoryId: number) {
    this.currentPage = this.paginationDto.currentPage;
    this.size = this.paginationDto.defaultSize;
    this.productCategoryService.getProductsByCategoryId(categoryId,  this.currentPage - 1, this.size)
    .subscribe(data  => {
      this.loader = false;
      this.products = [];
      this.products = data.content;
    }, error => {
      this.loader = false;
    })
  }

  checkProduct(product: Product) {
    this.selectedProduct = product;
    
  }

  setActiveIndex(index: number) {
    this.activeIndex = index;
  }

}
