import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { currencyHelper } from '../../../helpers/currencyDisplay';

import { CartItem } from 'src/app/models/CartItem';
import { Order } from 'src/app/models/Order';
import { ShoppingCart } from 'src/app/models/ShoppingCart';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shoppingcart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.sass']
})

export class ShoppingCartComponent implements OnInit {
  orderProcessNumber = 1;
  showPaymentModal = false;
  paymentMethodNumber = 0;
  paymentSuccessful = false;

  infoForm: FormGroup = new FormGroup({});
  cart: ShoppingCart = {
    cartItems: [] = [],
    itemsAmount: 0,
    totalPrice: 0
  };

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getShoppingcart();

    this.infoForm = new FormGroup({
      userEmail: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      address: new FormControl(null, {
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  checkDeliveryInfo(): boolean {
    let check = false;

    if (this.infoForm.valid) {
      check = true;
      this.orderProcessNumber = 3;
    }

    return check;
  }

  changeShowPayment(methodNumber: number): void {
    this.paymentMethodNumber = methodNumber;
    this.showPaymentModal = !this.showPaymentModal;
  }

  paymentSuccess(): void {
    this.paymentSuccessful = true;
  }

  orderProcess(numb: number): void {
    this.orderProcessNumber = numb;
  }

  decreaseAmount(item: CartItem): void {
    this.cartService.decreaseItemAmount(item);
  }

  addAmount(item: CartItem): void {
    this.cartService.addToCart(item.item);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItemFromCart(item);
  }

  completeOrder(): void {
    const order: Order = {
      _id: '',
      items: this.cart.cartItems,
      totalPrice: this.cart.totalPrice,
      totalNumberItems: this.cart.itemsAmount,
      status: 'order made',
      userEmail: this.infoForm.value.userEmail,
      address: this.infoForm.value.address,
      city: this.infoForm.value.city
    };

    this.orderService.completeOrder(order);
  }

  prettyCurrency(numb: number) {
    return currencyHelper(numb);
  }
}
