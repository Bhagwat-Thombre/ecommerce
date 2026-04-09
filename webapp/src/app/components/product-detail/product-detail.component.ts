import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatButtonModule, ProductCardComponent, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  product!: Product;
  mainImage!: string;
  similarProducts: Product[] = [];

  ngOnInit() {
    this.route.params.subscribe((x: any) => {
      this.getProductDetaqil(Number(x.id)); // ✅ ensure number
    });
  }

  getProductDetaqil(id: number) {
    this.customerService.getProductById(id).subscribe((result) => {
      this.product = result;

      this.mainImage = this.product.images?.[0] || ''; // ✅ safe

      this.customerService
        .getProducts('', Number(this.product.categoryId), '', -1, 0, 1, 4)
        .subscribe((result) => {
          this.similarProducts = result;
        });
    });
  }

  changeImage(url: string) {
    this.mainImage = url;
  }

  get sellingPrice() {
    const discount = this.product.discount || 0; // ✅ safe
    return Math.round(
      this.product.price - (this.product.price * discount) / 100,
    );
  }

  // ================= WISHLIST =================

  addToWishList(product: Product) {
    if (!product.id) return;

    if (this.isInWishlist(product)) {
      this.wishlistService
        .removeFromWishlists(product.id)
        .subscribe(() => this.wishlistService.init());
    } else {
      this.wishlistService
        .addInWishlist(product.id)
        .subscribe(() => this.wishlistService.init());
    }
  }

  isInWishlist(product: Product) {
    let isExits = this.wishlistService.wishlists.find(
      (x) => x.id === product.id, // ✅ FIX
    );
    return !!isExits; // ✅ clean
  }

  // ================= CART =================

  addToCart(product: Product) {
    if (!product.id) return;

    if (!this.isProductInCart(product.id)) {
      this.cartService.addToCart(product.id, 1).subscribe(() => {
        this.cartService.init();
      });
    } else if (product.id) {
      this.cartService.removeFromCart(product.id).subscribe(() => {
        this.cartService.init();
      });
    }
  }

  isProductInCart(productId: number) {
    // ✅ FIX
    return !!this.cartService.items.find(
      (x) => x.product.id === productId, // ✅ FIX
    );
  }
}
