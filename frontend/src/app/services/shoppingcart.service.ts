import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../models/CartItem';
import { Item } from '../models/Item';

@Injectable({ providedIn: 'root' })

export class ShoppingCartService {
  private shoppingcart: CartItem[] = [];
  private shoppingcartUpdated = new Subject<{ items: CartItem[] }>();

  getShoppingcart(): CartItem[] {
    this.shoppingcart = JSON.parse(sessionStorage.getItem('shopcart') || '{}');
    return this.shoppingcart;
  }

  addToCart(newItem: Item): void {
    let itemExistInCart;

    if (this.shoppingcart.length > 0 && this.shoppingcart) {
      itemExistInCart = this.shoppingcart.find(({item}) => item._id === newItem._id) || null;
    }

    if (!itemExistInCart) {
      const cartItem: CartItem = {
        item: newItem,
        num: 1
      };

      if (this.shoppingcart){
        this.shoppingcart.push(cartItem);
        this.saveToLocalstorage();
      }
    } else {
      itemExistInCart.num += 1;
      this.saveToLocalstorage();
    }

    console.log('[AddItemToCart]', newItem);
  }

  removeFromCart(itemToRemove: CartItem): void {
    const itemExistInCart = this.shoppingcart.find(({item}) => item === itemToRemove.item);

    if (itemExistInCart){
      if (itemExistInCart.num > 1) {
        itemExistInCart.num -= 1;
        this.saveToLocalstorage();
      } else {
        const newItemExistInCart = this.shoppingcart.indexOf(itemToRemove);
        this.shoppingcart.splice(newItemExistInCart, 1);
        this.saveToLocalstorage();
      }
    }
  }

  removeItem(cartItem: CartItem): void {
    const itemExistInCart = this.shoppingcart.find(({item}) => item === cartItem.item);
    if (itemExistInCart) {
      const itemIndex = this.shoppingcart.indexOf(itemExistInCart);
      this.shoppingcart.splice(itemIndex, 1);
      this.saveToLocalstorage();
    }
  }

  private saveToLocalstorage(): void {
    console.log('save to localstorage', this.shoppingcart);
    sessionStorage.setItem('shopcart', JSON.stringify(this.shoppingcart));
  }

  removeFromSessionStoreage(): void {
    sessionStorage.removeItem('shopcart');
  }

  getTotalItems(): number {
    let numberOfItems = 0;

    if (this.shoppingcart.length > 0) {
      this.shoppingcart.forEach(item => {
        numberOfItems += item.num;
      });
    }

    return numberOfItems;
  }

  getTotalPrice(): number {
    let totalPrice = 0;

    if (this.shoppingcart.length > 0) {
      this.shoppingcart.forEach(item => {
        totalPrice += (item.num * item.item.price);
      });
    }

    return totalPrice;
  }
}
