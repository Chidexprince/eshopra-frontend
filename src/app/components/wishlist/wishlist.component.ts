import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistItems: CartItem[] = []
  quantity: number = 1;

  constructor(private wishlistService: WishlistService, private cartService: CartService){}

  ngOnInit(): void {
    this.getWishlistItems();
  }


  getWishlistItems() {
    this.wishlistService.wishlistItem$.subscribe((items) => {
      this.wishlistItems = items;
      console.log(items)
    })
  }

  addToCart(cartItem: CartItem) {
    cartItem.quantity = this.quantity;
    this.cartService.addToCart(cartItem);
  }

  removeFromWishlist(wishlistItem: CartItem) {
    this.wishlistService.removeFromWishlist(wishlistItem);
  }

}
