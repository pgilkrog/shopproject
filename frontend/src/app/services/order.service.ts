import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { ShoppingCartService } from './shoppingcart.service';
import { map } from 'rxjs/operators';
import { ItemService } from './item.service';

@Injectable({ providedIn: 'root' })

export class OrderService {
  BACKEND_URL = environment.apiUrl + 'order';

  constructor(
    private http: HttpClient,
    private cartService: ShoppingCartService,
    private router: Router,
    private itemService: ItemService
  ) {}

  completeOrder(order: Order): void {
    this.http.post<{ completed: boolean }>(this.BACKEND_URL, order).subscribe(responseData => {
      if (responseData.completed === true) {
        for (const item of order.items) {
          const newItem = item.item;
          newItem.amountInStock -= item.num;
          newItem.numberBought += item.num;
          this.itemService.updateItem(newItem);
        }
        this.cartService.removeFromSessionStoreage();
        this.router.navigate(['CompletedOrder']);
      }
    });
  }

  getOrdersByUserEmail(email: string): any {
    return this.http.get<{orders: any}>(this.BACKEND_URL + '/' + email).pipe(map((orderData) => {
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
