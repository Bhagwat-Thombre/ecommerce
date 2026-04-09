import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../types/order';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http = inject(HttpClient);

  addOrder(order: Order) {
    return this.http.post<{ message: string }>(
      environment.apiUrl + '/customer/order',
      order,
    );
  }

  getCustomerOrders() {
    return this.http.get<Order[]>(environment.apiUrl + '/customer/orders');
  }

  getAdminOrders() {
    // ✅ renamed
    return this.http.get<Order[]>(environment.apiUrl + '/orders');
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(environment.apiUrl + '/orders/' + id, {
      status: status,
    });
  }
}
