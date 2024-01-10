import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  

  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([]);
  cartItem$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  addToCart(cartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === cartItem.id
      );
      alreadyExistsInCart = !!existingCartItem;
    }

    if (alreadyExistsInCart) {
      if (existingCartItem) return;
    } else {
      cartItem.quantity = 1;
      this.cartItems.push(cartItem); // add to cart
    }

    // update BehaviourSubject
    this.cartItemsSubject.next(this.cartItems);

    // compute cart total price and total quantity
    this.computeCartTotal();
  }

  removeFromCart(cartItemId: number) {
    const itemIndex = this.cartItems.findIndex(
      (item) => item.id === cartItemId
    );

    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1)[0];

      // update BehaviourSubject
      this.cartItemsSubject.next(this.cartItems);

      // compute cart total price and total quantity after removing the item
      this.computeCartTotal();
    }
  }

  increaseQuantity(cartItem: CartItem) {
    let existingCartItem = this.findCartItemByProductId(cartItem.id);
  
    if (existingCartItem) {
      existingCartItem.quantity++;
      
    }
    this.computeCartTotal();
  }
  
  decreaseQuantity(cartItem: CartItem) {

    let existingCartItem = this.findCartItemByProductId(cartItem.id);
  
    if (existingCartItem && existingCartItem.quantity > 1) {
      existingCartItem.quantity--; 
    } 

    if (existingCartItem && existingCartItem.quantity == 1) {
      this.removeFromCart(existingCartItem.id); 
    }
    this.computeCartTotal();
  }

  computeCartTotal() {
    let totalPriceValue: number = 0.0;
    let totalQuantityValue: number = 0;

    for (let cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  findCartItemByProductId(productId: number): CartItem | undefined {
    return this.cartItems.find((cartItem) => cartItem.id === productId);
  }
}
