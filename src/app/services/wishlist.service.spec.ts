import { TestBed } from '@angular/core/testing';

import { WishlistService } from './wishlist.service';
import { CartItem } from '../common/cart-item';

describe('WishlistService', () => {
  let service: WishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistService);

    // Clear the local storage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to wishlist', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 1, unitPrice: 15.80, imageUrl: 'test.jpg' };
    service.addToWishlist(item);

    service.wishlistItem$.subscribe(wishlist => {
      expect(wishlist.length).toBe(1);
      expect(wishlist[0]).toEqual(item);
    });
  });

  it('should not add duplicate item to wishlist', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 1, unitPrice: 15.80, imageUrl: 'test.jpg' };
    service.addToWishlist(item);
    service.addToWishlist(item); // Try adding the same item again

    service.wishlistItem$.subscribe(wishlist => {
      expect(wishlist.length).toBe(1);
      expect(wishlist[0]).toEqual(item);
    });
  });

  it('should remove item from wishlist', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 1, unitPrice: 15.80, imageUrl: 'test.jpg' };
    service.addToWishlist(item);
    service.removeFromWishlist(item);

    service.wishlistItem$.subscribe(wishlist => {
      expect(wishlist.length).toBe(0);
    });
  });

  it('should return true if item is in wishlist', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 1, unitPrice: 15.80, imageUrl: 'test.jpg' };
    service.addToWishlist(item);

    const isInWishlist = service.isItemInWishlist(item);

    expect(isInWishlist).toBe(true);
  });

  it('should return false if item is not in wishlist', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 1, unitPrice: 15.80, imageUrl: 'test.jpg' };

    const isInWishlist = service.isItemInWishlist(item);

    expect(isInWishlist).toBe(false);
  });

  it('should get wishlist item count', () => {
    const items: CartItem[] = [
      { id: 1, name: 'Test Product 1', quantity: 1, unitPrice: 10.80, imageUrl: 'test1.jpg' },
      { id: 2, name: 'Test Product 2', quantity: 2, unitPrice: 15.80, imageUrl: 'test2.jpg' },
    ];
    items.forEach(item => service.addToWishlist(item));

    const itemCount = service.getWishlistItemCount();

    expect(itemCount).toBe(items.length);
  });
});
