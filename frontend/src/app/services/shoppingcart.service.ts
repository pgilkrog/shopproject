import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from '../models/CartItem';
import { Item } from '../models/Item';
import { ShoppingCart } from '../models/ShoppingCart';

@Injectable({ providedIn: 'root' })

export class ShoppingCartService {
  private shoppingcart: ShoppingCart = {
    cartItems: [] = [],
    itemsAmount: 0,
    totalPrice: 0
  };

  private itemsAmount = new Subject<{ items: number }>();

  getShoppingcart(): ShoppingCart {
    return sessionStorage.getItem('shopcart') ?
      this.shoppingcart = JSON.parse(sessionStorage.getItem('shopcart') as string) :
      this.shoppingcart = {
        cartItems: [] = [],
        itemsAmount: 0,
        totalPrice: 0
      };
  }

  getTotalAmount(): Observable<{ items: number}> {
    return this.itemsAmount.asObservable();
  }

  addToCart(newItem: Item): void {
    const itemExistInCart = this.shoppingcart.cartItems.find(({item}) => item._id === newItem._id);

    if (!itemExistInCart) {
      const cartItem: CartItem = {
        item: newItem,
        num: 1
      };

      if (this.shoppingcart) {
        console.log(this.shoppingcart);
        this.shoppingcart.cartItems.push(cartItem);
        this.saveToLocalstorage();
      }
    } else {
      itemExistInCart.num += 1;
      this.saveToLocalstorage();
    }

    console.log('[AddItemToCart]', newItem);
  }

  removeFromCart(itemToRemove: CartItem): void {
    const itemExistInCart = this.shoppingcart.cartItems.find(({item}) => item === itemToRemove.item);

    if (itemExistInCart){
      if (itemExistInCart.num > 1) {
        itemExistInCart.num -= 1;
        this.saveToLocalstorage();
      } else {
        const newItemExistInCart = this.shoppingcart.cartItems.indexOf(itemToRemove);
        this.shoppingcart.cartItems.splice(newItemExistInCart, 1);
        this.saveToLocalstorage();
      }
    } else {
      return;
    }
  }

  removeItem(cartItem: CartItem): void {
    const itemExistInCart = this.shoppingcart.cartItems.find(({item}) => item === cartItem.item);
    if (itemExistInCart) {
      const itemIndex = this.shoppingcart.cartItems.indexOf(itemExistInCart);
      this.shoppingcart.cartItems.splice(itemIndex, 1);
      this.saveToLocalstorage();
    }
  }

  private saveToLocalstorage(): void {
    console.log('save to localstorage', this.shoppingcart);
    this.calcPriceAndAmount();
    sessionStorage.setItem('shopcart', JSON.stringify(this.shoppingcart));
  }

  removeFromSessionStoreage(): void {
    sessionStorage.removeItem('shopcart');
  }

  calcPriceAndAmount(): void {
    this.shoppingcart.itemsAmount = this.getTotalItems();
    this.shoppingcart.totalPrice = this.getTotalPrice();
  }

  getTotalItems(): number {
    let numberOfItems = 0;

    if (this.shoppingcart.cartItems.length > 0) {
      this.shoppingcart.cartItems.forEach(item => {
        numberOfItems += item.num;
      });
    }
    this.itemsAmount.next({
      items: numberOfItems
    });
    return numberOfItems;
  }

  getTotalPrice(): number {
    let totalPrice = 0;

    if (this.shoppingcart.cartItems.length > 0) {
      this.shoppingcart.cartItems.forEach(item => {
        totalPrice += (item.num * item.item.price);
      });
    }

    return totalPrice;
  }
}
