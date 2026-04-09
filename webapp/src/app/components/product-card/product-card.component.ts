import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  wishlistService = inject(WishlistService);
  get sellingPrice() {
    return Math.round(
      this.product.price - (this.product.price * this.product.discount) / 100,
    );
  }

  addToWishList(product: Product) {
    console.log(product);
    if (this.isInWishlist(product)) {
      this.wishlistService
        .removeFromWishlists(product.id)
        .subscribe((result) => {
          this.wishlistService.init();
        });
    } else {
      this.wishlistService.addInWishlist(product.id).subscribe((result) => {
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product: Product) {
    let isExits = this.wishlistService.wishlists.find(
      (x) => x.id == product.id,
    );
    if (isExits) return true;
    else return false;
  }
  cartService = inject(CartService);
  addToCart(product: Product) {
    console.log(product);
    if (!this.isProductInCart(product.id)) {
      this.cartService.addToCart(product.id, 1).subscribe(() => {
        this.cartService.init();
      });
    } else {
      this.cartService.removeFromCart(product.id).subscribe(() => {
        this.cartService.init();
      });
    }
  }
  isProductInCart(productId: number) {
    if (this.cartService.items.find((x) => x.product.id == productId)) {
      return true;
    } else {
      return false;
    }
  }
}
