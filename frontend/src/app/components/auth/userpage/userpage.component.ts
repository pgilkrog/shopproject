import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.sass']
})

export class UserpageComponent implements OnInit {
  user?: User;
  orders: Order[] = [];

  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.userService.autoAuthUser();
    this.userService.getUserById().subscribe(
      (data: any) => {
        this.user = data.user as User;
        this.orderService.getOrdersByUserEmail(data.user.email as string).subscribe((dataO: any) => this.orders = dataO.orders);
      }
    );
  }
}
