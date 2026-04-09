import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../types/brand';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  http = inject(HttpClient);

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + '/brand');
  }

  getBrandById(id: number) {
    return this.http.get<Brand>(environment.apiUrl + '/brand/' + id);
  }

  addBrand(name: string) {
    return this.http.post(environment.apiUrl + '/brand', { name });
  }

  updateBrand(id: number, name: string) {
    // ✅ FIX
    return this.http.put(environment.apiUrl + '/brand/' + id, { name });
  }

  deleteBrandById(id: number) {
    // ✅ FIX
    return this.http.delete(environment.apiUrl + '/brand/' + id);
  }
}
