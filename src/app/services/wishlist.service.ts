import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  wishlistItem$: Observable<CartItem[]> = this.wishlistSubject.asObservable();

  constructor() { 
    this.loadWishlist();
  }

  //TODO: bind wish list with userID
  private loadWishlist() {
    const storedWishlist = localStorage.getItem("wishlist");
    const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    this.wishlistSubject.next(wishlist);
  }

  private saveWishlist(wishlist: CartItem[]) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    this.wishlistSubject.next(wishlist);
  }

  getWishlistItemCount(): number {
    return this.wishlistSubject.value.length;
  }

  addToWishlist(item: CartItem) {
    const currentWishlist = this.wishlistSubject.value;
    if(!this.isItemInWishlist(item)) {
      const updateWishlist = [...currentWishlist, item];
      this.saveWishlist(updateWishlist);
    }
  }

  removeFromWishlist(item: CartItem) {
    const currentWishlist = this.wishlistSubject.value;
    const updatedWishlist = currentWishlist.filter((wishlistItem) => wishlistItem.id !== item.id);
    this.saveWishlist(updatedWishlist);
  }

   isItemInWishlist(item: CartItem): boolean {
    return this.wishlistSubject.value.some(wishlistItem => wishlistItem.id === item.id);
  }

}
