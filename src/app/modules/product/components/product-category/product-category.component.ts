import { Component, Input } from '@angular/core';
import { ProductCategory } from 'src/app/shared/models/product-category';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent {
  @Input()
  productCategory!: ProductCategory[];

  @Input()
  productLength = 0;
}
