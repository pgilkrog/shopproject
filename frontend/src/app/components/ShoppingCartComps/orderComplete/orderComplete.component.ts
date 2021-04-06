import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordercomplete',
  templateUrl: './orderComplete.component.html',
  styleUrls: ['./orderComplete.component.sass']
})

export class OrderCompleteComponent implements OnInit {
  orderId = '';

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: routeParams => this.orderId = routeParams.orderId,
      error: error => console.log(error)
    });
  }
}
