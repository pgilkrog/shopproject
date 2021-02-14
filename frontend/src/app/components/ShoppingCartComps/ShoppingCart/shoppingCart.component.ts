import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.sass']
})

export class ShoppingCartComponent implements OnInit, OnDestroy {
  infoForm: FormGroup = new FormGroup({});
  cart: any[] = [];
  private cartSub: Subscription = new Subscription();

  constructor(private cartService: ShoppingCartService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getShoppingcart();
    this.infoForm = new FormGroup({
      userEmail: new FormControl(null, {
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

  decreaseAmount(item: any): void {
    this.cartService.removeFromCart(item);
  }

  addAmount(item: any): void {
    this.cartService.addToCart(item);
  }

  removeItem(item: any): void {
    this.cartService.removeItem(item);
  }

  completeOrder(): void{
    const order: Order = {
      _id: '',
      items: this.cart,
      totalPrice: 23,
      totalNumberItems: 43,
      status: 'order made',
      userEmail: this.infoForm.value.userEmail,
      address: this.infoForm.value.address,
      city: this.infoForm.value.city
    };

    this.orderService.completeOrder(order);
  }
}
