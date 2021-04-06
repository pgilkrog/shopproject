import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { ShoppingCartService } from './shoppingcart.service';
import { map } from 'rxjs/operators';
import { ItemService } from './item.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class OrderService {
  BACKEND_URL = environment.apiUrl + 'order';

  constructor(
    private http: HttpClient,
    private cartService: ShoppingCartService,
    private router: Router,
    private itemService: ItemService
  ) {}

  getOrderById(orderId: string): any {
    return this.http.get<{ order: Order }>(this.BACKEND_URL + '/' + orderId);
  }

  completeOrder(order: Order): void {
    this.http.post<{ newOrderId: string }>(this.BACKEND_URL, order).subscribe(responseData => {
      if (responseData) {
        for (const item of order.items) {
          const newItem = item.item;
          newItem.amountInStock -= item.num;
          newItem.numberBought += item.num;
          this.itemService.updateItem(newItem);
        }
        this.cartService.removeFromSessionStoreage();
        this.router.navigate(['/CompletedOrder/' + responseData.newOrderId]);
      }
    });
  }

  getOrdersByUserEmail(email: string): any {
    return this.http.get<{orders: any}>(`${this.BACKEND_URL}/email/${email}`).pipe(map((orderData) => {
      return { orders: orderData.orders.map((order: Order) => {
        return {
          _id: order._id,
          items: order.items,
          totalPrice: order.totalPrice,
          totalNumberItems: order.totalNumberItems,
          status: order.status,
          userEmail: order.userEmail,
          address: order.address,
          city: order.city,
        };
      })};
    }));
  }
}
