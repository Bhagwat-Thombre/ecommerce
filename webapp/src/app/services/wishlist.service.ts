import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  http = inject(HttpClient);

  wishlists: Product[] = [];

  init() {
    this.getWishlists().subscribe((result) => {
      this.wishlists = result;
    });
  }

  getWishlists() {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/wishlists');
  }

  addInWishlist(productId: number): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/customer/wishlists/' + productId,
      {},
    );
  }

  removeFromWishlists(productId: number): Observable<any> {
    return this.http.delete(
      environment.apiUrl + '/customer/wishlists/' + productId,
    );
  }
}
