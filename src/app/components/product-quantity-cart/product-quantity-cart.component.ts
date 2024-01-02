import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-quantity-cart',
  templateUrl: './product-quantity-cart.component.html',
  styleUrls: ['./product-quantity-cart.component.scss']
})
export class ProductQuantityCartComponent implements OnInit {
  @Input() product!: Product;
  @Output() cartItemId = new EventEmitter<number>();
  cartItem: CartItem | undefined;
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.getCartItems()
  }

  getCartItems(){
    this.cartService.cartItem$.subscribe((items) => {
      this.cartItems = items;
      this.cartItem = this.cartItems.find(cart => cart.id == this.product.id);  
    })    
  }

  increaseQuantity(product: Product) {
    let cartItem = new CartItem(product);
    if (cartItem) this.cartService.increaseQuantity(cartItem);
  }

  decreaseQuantity(product: Product) {
    console.log(product)
    let cartItem = new CartItem(product);
    if (cartItem) this.cartService.decreaseQuantity(cartItem);
    if (this.cartItem && this.cartItem.quantity < 1) {
      console.log(cartItem)
      this.cartService.removeFromCart(cartItem.id);
      this.cartItem = this.cartService.findCartItemByProductId(product.id);
      this.cartItemId.emit(product.id);
    }
  }
}
