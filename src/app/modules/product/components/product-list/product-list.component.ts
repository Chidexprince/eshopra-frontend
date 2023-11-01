import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ProductCategoryService } from '../../service/product-category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductCategory } from 'src/app/shared/models/product-category';
import { PaginationDto } from 'src/app/shared/models/pagination-dto';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  loader = false;
  products: Product[] = [];
  productCategory: ProductCategory[] = [];
  categoryId!: number;
  isCategory!: boolean;
  totalProducts!: Number;
  currentPage!: number;
  size!: number;
  paginationDto = new PaginationDto();

  constructor(private productService: ProductService, 
    private productCategoryService: ProductCategoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params["id"];
      const keyword = params["keyword"];

      this.initializePaginationData();

      if(this.categoryId) {
        this.getProductsByCategory();
      } else if(keyword) {
        this.findProductsByName(keyword);
      } else {
        this.getProductList();
      }
    })
    this.getProductCategory();
  }

  initializePaginationData() {
    this.paginationDto.currentPage = 1;
    this.paginationDto.defaultSize = 10;
    this.paginationDto.totalSize = 100;
  }

  getProductList() {
    this.loader = true;
    this.currentPage = this.paginationDto.currentPage;
    this.size = this.paginationDto.defaultSize;
    this.productService.getProducts(this.currentPage - 1, this.size)
    .subscribe(data  => {
      console.log(data)
      this.loader = false;
      this.products = data.content;
      this.totalProducts = data.totalElements;
      this.paginationDto.totalSize = data.totalElements;
    }, error => {
      console.log(error.message)
      this.loader = false;
    })
  }

  getProductCategory() {
    this.loader = true;
    this.productCategoryService.getProductCategory()
    .subscribe(data  => {
      this.productCategory = data.content
    }, error => {
      console.log(error.message)
    })
  }

  getProductsByCategory() {
    this.isCategory = true;
    this.loader = true;
    this.currentPage = this.paginationDto.currentPage;
    this.size = this.paginationDto.defaultSize;
    this.productCategoryService.getProductsByCategoryId(this.categoryId, this.currentPage - 1, this.size)
    .subscribe(data  => {
      this.loader = false;
      this.products = [];
      this.products = data.content;
      this.totalProducts = data.totalElements;
      this.paginationDto.totalSize = data.totalElements;
    }, error => {
      this.loader = false;
      console.log(error.message)
    })
  }

  findProductsByName(name: string) {
    this.loader = true;
    this.currentPage = this.paginationDto.currentPage;
    this.size = this.paginationDto.defaultSize;
    this.productService.findProductsByName(name, this.currentPage - 1, this.size)
    .subscribe(data  => {
      this.loader = false;
      console.log(data);
      this.products = [];
      this.products = data.content;
      this.paginationDto.totalSize = data.totalElements;
    }, error => {
      console.log(error.message)
      this.loader = false;
    })
  }

}
