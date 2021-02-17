import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/CartItem';
import { Item } from 'src/app/models/Item';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shoppingcart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.sass']
})

export class ShoppingCartComponent implements OnInit, OnDestroy {
  infoForm: FormGroup = new FormGroup({});
  cart: CartItem[] = [];
  totalItemsInCart = 0;
  totalPrice = 0;
  private cartSub: Subscription = new Subscription();

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

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

    this.ItemsInCart();
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

  decreaseAmount(item: CartItem): void {
    this.cartService.removeFromCart(item);
    this.ItemsInCart();
  }

  addAmount(item: CartItem): void {
    this.cartService.addToCart(item.item);
    this.ItemsInCart();
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
    this.ItemsInCart();
  }

  completeOrder(): void{
    const order: Order = {
      _id: '',
      items: this.cart,
      totalPrice: this.totalPrice,
      totalNumberItems: this.totalItemsInCart,
      status: 'order made',
      userEmail: this.infoForm.value.userEmail,
      address: this.infoForm.value.address,
      city: this.infoForm.value.city
    };

    this.orderService.completeOrder(order);
  }

  ItemsInCart(): void {
    this.totalItemsInCart = this.cartService.getTotalItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
