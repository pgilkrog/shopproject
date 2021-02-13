import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/Item';

@Injectable({ providedIn: 'root' })

export class ShoppingCartService {
  private shoppingcart: any[] = [];
  private shoppingcartUpdated = new Subject<{ items: any[] }>();

  getShoppingcart(): any[] {
    this.shoppingcart = JSON.parse(sessionStorage.getItem('shopcart') || '{}');
    return this.shoppingcart;
  }

  addToCart(item: Item): void {
    const itemExistInCart = this.shoppingcart.find(({name}) => name === item.name);
    if (!itemExistInCart) {
      this.shoppingcart.push({...item, num: 1});
      this.shoppingcartUpdate();
    } else {
      itemExistInCart.num += 1;
      this.saveToLocalstorage();
    }

    console.log('[AddItemToCart]', item);
  }

  removeFromCart(item: Item): void {
    let itemExistInCart = this.shoppingcart.find(({_id}) => _id === item._id);
    if (itemExistInCart.num > 1) {
      itemExistInCart.num -= 1;
      this.saveToLocalstorage();
    } else {
      itemExistInCart = this.shoppingcart.indexOf(item._id);
      this.shoppingcart.splice(itemExistInCart, 1);
      this.shoppingcartUpdate();
    }
  }

  shoppingcartUpdate(): void {
    this.shoppingcartUpdated.next({
      items: [...this.shoppingcart]
    });

    this.saveToLocalstorage();
  }

  private saveToLocalstorage(): void {
    console.log('save to localstorage', this.shoppingcart);
    sessionStorage.setItem('shopcart', JSON.stringify(this.shoppingcart));
  }

  private removeLocalStorage(): void {
    sessionStorage.removeItem('shopcart');
  }
}
