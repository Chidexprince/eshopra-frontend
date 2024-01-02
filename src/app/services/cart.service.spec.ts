import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CartItem } from '../common/cart-item';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 1, unitPrice: 15.80, imageUrl: 'test.jpg' };
    service.addToCart(item);

    service.cartItem$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0]).toEqual(item);
    });

    service.totalPrice.subscribe(totalPrice => {
      expect(totalPrice).toBe(item.quantity * item.unitPrice);
    });

    service.totalQuantity.subscribe(totalQuantity => {
      expect(totalQuantity).toBe(item.quantity);
    });
  });

  it('should remove item from cart', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 1, unitPrice: 15.80, imageUrl: 'test.jpg' };
    service.addToCart(item);
    service.removeFromCart(item.id);

    service.cartItem$.subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });

    service.totalPrice.subscribe(totalPrice => {
      expect(totalPrice).toBe(0);
    });

    service.totalQuantity.subscribe(totalQuantity => {
      expect(totalQuantity).toBe(0);
    });
  });

  it('should increase item quantity in cart', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 1, unitPrice: 15.80, imageUrl: 'test.jpg' };
    service.addToCart(item);
    service.increaseQuantity(item);

    service.cartItem$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].quantity).toBe(2);
    });

    service.totalPrice.subscribe(totalPrice => {
      expect(totalPrice).toBe(2 * item.unitPrice);
    });

    service.totalQuantity.subscribe(totalQuantity => {
      expect(totalQuantity).toBe(2);
    });
  });

  it('should decrease item quantity in cart', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 2, unitPrice: 15.80, imageUrl: 'test.jpg' };
    service.addToCart(item);
    service.decreaseQuantity(item);

    service.cartItem$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].quantity).toBe(1);
    });

    service.totalPrice.subscribe(totalPrice => {
      expect(totalPrice).toBe(1 * item.unitPrice);
    });

    service.totalQuantity.subscribe(totalQuantity => {
      expect(totalQuantity).toBe(1);
    });
  });

  it('should not decrease item quantity below 1', () => {
    const item: CartItem = { id: 1, name: 'Test Product', quantity: 1, unitPrice: 15.80, imageUrl: 'test.jpg' };
    service.addToCart(item);
    service.decreaseQuantity(item);

    service.cartItem$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].quantity).toBe(1);
    });

    service.totalPrice.subscribe(totalPrice => {
      expect(totalPrice).toBe(1 * item.unitPrice);
    });

    service.totalQuantity.subscribe(totalQuantity => {
      expect(totalQuantity).toBe(1);
    });
  });

  it('should compute total price and quantity correctly', () => {
    const item1: CartItem = { id: 1, name: 'Test Product 1', quantity: 2, unitPrice: 10.80, imageUrl: 'test1.jpg' };
    const item2: CartItem = { id: 2, name: 'Test Product 2', quantity: 3, unitPrice: 15.80, imageUrl: 'test2.jpg' };

    service.addToCart(item1);
    service.addToCart(item2);

    service.computeCartTotal();

    service.totalPrice.subscribe(totalPrice => {
      expect(totalPrice).toBe((item1.quantity * item1.unitPrice) + (item2.quantity * item2.unitPrice));
    });

    service.totalQuantity.subscribe(totalQuantity => {
      expect(totalQuantity).toBe(item1.quantity + item2.quantity);
    });
  });

  it('should find cart item by product ID', () => {
    const item1: CartItem = { id: 1, name: 'Test Product 1', quantity: 2, unitPrice: 10.80, imageUrl: 'test1.jpg' };
    const item2: CartItem = { id: 2, name: 'Test Product 2', quantity: 3, unitPrice: 15.80, imageUrl: 'test2.jpg' };

    service.addToCart(item1);
    service.addToCart(item2);

    const foundItem = service.findCartItemByProductId(item2.id);

    expect(foundItem).toEqual(item2);
  });

  it('should return undefined if cart item is not found by product ID', () => {
    const item1: CartItem = { id: 1, name: 'Test Product 1', quantity: 2, unitPrice: 15.80, imageUrl: 'test1.jpg' };

    service.addToCart(item1);

    const foundItem = service.findCartItemByProductId(2);

    expect(foundItem).toBeUndefined();
  });

});
