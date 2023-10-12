import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input()
  product!: Product;

  @Output() selectProduct = new EventEmitter<Product>();

  productClick() {
    this.selectProduct.emit(this.product);
  }

}
