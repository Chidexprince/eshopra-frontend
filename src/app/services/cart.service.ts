import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartItem$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if(this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);
      alreadyExistsInCart = !!existingCartItem;
    }

    if(alreadyExistsInCart) {
      if(existingCartItem) existingCartItem.quantity++; // increment
    } else {
      this.cartItems.push(cartItem); // add to cart
    }

    // update BehaviourSubject
    this.cartItemsSubject.next(this.cartItems);

    // compute cart total price and total quantity
    this.computeCartTotal();
  }


  computeCartTotal() {
    
    let totalPriceValue: number = 0.00;
    let totalQuantityValue: number = 0;

    for(let cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  
  
}
