import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';

@Injectable({ providedIn: 'root' })

export class OrderService {
  BACKEND_URL = environment.apiUrl + 'order';

  completeOrder(order: Order): void {
    console.log('[order]', order);
  }
}
