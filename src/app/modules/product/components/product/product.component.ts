import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
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

  constructor(private cartService: CartService, private wishlistService: WishlistService) {}

  productClick() {
    this.selectProduct.emit(this.product);
  }

  addToCart(product: Product) {
    let cartItem = new CartItem(product);
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
