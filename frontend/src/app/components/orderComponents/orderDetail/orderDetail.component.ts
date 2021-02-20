import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderDetail.component.html',
  styleUrls: ['./orderDetail.component.sass']
})

export class OrderDetailComponent implements OnInit {
  order?: Order;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderService.getOrderById(this.route.snapshot.paramMap.get('id') as string)
      .subscribe((data: any) => this.order = data.order as Order);
  }
}
