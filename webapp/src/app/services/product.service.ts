import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  getAllProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/product');
  }

  getProductbyId(id: number) {
    // ✅ FIX
    return this.http.get<Product>(environment.apiUrl + '/product/' + id);
  }

  addProduct(model: Product) {
    return this.http.post(environment.apiUrl + '/product', model);
  }

  updateProduct(id: number, model: Product) {
    // ✅ FIX
    return this.http.put(environment.apiUrl + '/product/' + id, model);
  }

  deleteProduct(id: number) {
    // ✅ FIX
    return this.http.delete(environment.apiUrl + '/product/' + id);
  }
}
