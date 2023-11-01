import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { WishlistService } from 'src/app/services/wishlist.service';

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
  quantity: number = 1;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private wishlistService: WishlistService, 
              private route: ActivatedRoute){}
  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get("id"));
    if(this.modalView) {
      this.getProductDetail(this.product?.id)
    } else {
      this.getProductDetail(productId);
    }
    
  }

  getProductDetail(productId: number) {
    this.productService.getProductById(productId)
    .subscribe(data => {
      this.product = data;
    }, error => {
      console.log(error.message);
    })
  }

  addToCart(product: Product) {
    console.log(this.quantity)
    let cartItem = new CartItem(product);
    cartItem.quantity = this.quantity;
    this.cartService.addToCart(cartItem);
  }

  isInWishlist(product: Product){
    let wishItem = new CartItem(product);
    return this.wishlistService.isItemInWishlist(wishItem);
  }

  toggleWishlist(product: Product) {
    let wishItem = new CartItem(product);
    if(this.wishlistService.isItemInWishlist(wishItem)) {
      this.wishlistService.removeFromWishlist(wishItem);
    } else {
      this.wishlistService.addToWishlist(wishItem);
    }
  }
}
