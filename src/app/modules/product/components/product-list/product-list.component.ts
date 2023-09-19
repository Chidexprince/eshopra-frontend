import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  loader = false;
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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
    })
  }

}
