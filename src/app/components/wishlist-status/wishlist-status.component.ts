import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist-status',
  templateUrl: './wishlist-status.component.html',
  styleUrls: ['./wishlist-status.component.scss']
})
export class WishlistStatusComponent implements OnInit {
  wishlistItems: number = 0;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.getWishlistStatus();
  }

  getWishlistStatus() {
    this.wishlistService.wishlistItem$.subscribe((items) => {
      this.wishlistItems = this.wishlistService.getWishlistItemCount();
    })
    
  }

}
