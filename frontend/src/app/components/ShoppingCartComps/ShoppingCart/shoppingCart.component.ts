import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { ShoppingCartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingCart.component.html',
})

export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart: any[] = [];
  private cartSub: Subscription = new Subscription();

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getShoppingcart();
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

  removeItem(item: any): void {
    this.cartService.removeFromCart(item);
  }
}
