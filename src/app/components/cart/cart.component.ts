import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  cartItemId!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    this.cartService.cartItem$.subscribe((items) => {
      this.cartItems = items;  
    })

    this.cartService.totalPrice.subscribe((data) => {
      this.totalPrice = data;
    })
    
  }

  increaseQuantity(cartItem: CartItem) {
    this.cartService.increaseQuantity(cartItem);
 }
 
 decreaseQuantity(cartItem: CartItem) {
    this.cartService.decreaseQuantity(cartItem);
 }

  removeCartItem() {
    this.cartService.removeFromCart(this.cartItemId);
  }

}
