import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  @Input()
  product!: Product;

  @Input()
  modalView!: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute){}
  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get("id"));
    this.getProductDetail(productId);
  }

  getProductDetail(productId: number) {
    this.productService.getProductById(productId)
    .subscribe(data => {
      this.product = data;
      console.log(this.product.category.categoryName)
    }, error => {
      console.log(error.message);
    })
  }
}
