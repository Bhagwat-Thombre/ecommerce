import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../types/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/category');
  }

  getCategoryById(id: number) {
    // ✅ FIX
    return this.http.get<Category>(environment.apiUrl + '/category/' + id);
  }

  addCategory(name: string) {
    return this.http.post(environment.apiUrl + '/category', { name: name });
  }

  updateCategory(id: number, name: string) {
    // ✅ FIX
    return this.http.put(environment.apiUrl + '/category/' + id, {
      name: name,
    });
  }

  deleteCategoryById(id: number) {
    // ✅ FIX
    return this.http.delete(environment.apiUrl + '/category/' + id);
  }
}
