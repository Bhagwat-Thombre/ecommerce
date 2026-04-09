import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';
import { CartItem } from '../types/cartItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  items: CartItem[] = [];

  init() {
    this.getCartItems().subscribe({
      next: (result) => {
        this.items = result;
      },
      error: (err) => console.error('Cart load failed', err),
    });
  }

  getCartItems() {
    return this.http.get<CartItem[]>(environment.apiUrl + '/customer/carts');
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(environment.apiUrl + '/customer/carts/' + productId, {
      quantity,
    });
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(
      environment.apiUrl + '/customer/carts/' + productId,
    );
  }
}
