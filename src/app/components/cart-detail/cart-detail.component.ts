import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    this.cartService.cartItem$.subscribe((items) => {
      this.cartItems = items;
    })

    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    }
      
    )
  }
  
}
