import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { ShoppingCartService } from './shoppingcart.service';

@Injectable({ providedIn: 'root' })

export class OrderService {
  BACKEND_URL = environment.apiUrl + 'order';

  constructor(private http: HttpClient, private cartService: ShoppingCartService, private rotuer: Router) {}

  completeOrder(order: Order): void {
    console.log('completeOrder', JSON.stringify(order));
    this.http.post<{ completed: boolean }>(this.BACKEND_URL, order).subscribe(responseData => {
      if (responseData.completed === true) {
        this.cartService.removeFromSessionStoreage();
        this.rotuer.navigate(['CompletedOrder']);
      }
    });
  }
}
