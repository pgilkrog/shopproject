import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/CartItem';
import { Item } from '../models/Item';
import { ShoppingCart } from '../models/ShoppingCart';
import { ItemService } from './item.service';

@Injectable({ providedIn: 'root' })

export class ShoppingCartService {
  private shoppingcart: ShoppingCart = {
    cartItems: [] = [],
    itemsAmount: 0,
    totalPrice: 0
  };

  private itemsAmount = new BehaviorSubject<number>(0);
  itemsAmount$ = this.itemsAmount.asObservable();

  getShoppingcart(): ShoppingCart {
    return sessionStorage.getItem('shopcart') ?
      this.shoppingcart = JSON.parse(sessionStorage.getItem('shopcart') as string) :
      this.shoppingcart = {
        cartItems: [] = [],
        itemsAmount: 0,
        totalPrice: 0
      };
  }

  getTotalAmount(): Observable<number> {
    this.itemsAmount.next(this.getShoppingcart().itemsAmount);
    return this.itemsAmount$;
  }

  addToCart(newItem: Item): void {
    // check if items exists in cart
    const itemExistInCart = this.shoppingcart.cartItems.find(({item}) => newItem._id === item._id);

    // if not, add new item to cart
    if (!itemExistInCart) {
      const cartItem: CartItem = {
        item: newItem,
        num: 1
      };

      // add cartitem to shoppingcart, and save to sessionStorage
      this.shoppingcart.cartItems.push(cartItem);
      this.saveToSessionstorage();

    } else {
      // if items exists in cart, add 1 in amount, and save to sessionStorage
      itemExistInCart.num += 1;
      this.saveToSessionstorage();
    }
  }

  decreaseItemAmount(itemToRemove: CartItem): void {
    // check if items exists in cart
    const itemExistInCart = this.shoppingcart.cartItems.find(({item}) => item === itemToRemove.item);

    if (itemExistInCart){
      // check if amount is higher than 1
      if (itemExistInCart.num > 1) {
        // decrease by 1 if yes, and save to SessionStorage
        itemExistInCart.num -= 1;
        this.saveToSessionstorage();
      } else {
        // if amount is 1, find index of items, and remove from cart, and save to storage
        const newItemExistInCart = this.shoppingcart.cartItems.indexOf(itemToRemove);
        this.shoppingcart.cartItems.splice(newItemExistInCart, 1);
        this.saveToSessionstorage();
      }
    } else {
      return;
    }
  }

  checkAmountLeftOnItem(checkItem: Item): number {
    // Check if item exists in cart
    const itemExistInCart = this.shoppingcart.cartItems.find(({item}) => checkItem._id === item._id);
    // if item exists return number, else return 0
    return itemExistInCart ? itemExistInCart.num : 0;
  }

  removeItemFromCart(cartItem: CartItem): void {
    // check if item exists in cart.
    const itemExistInCart = this.shoppingcart.cartItems.find(({item}) => item === cartItem.item);
    if (itemExistInCart) {
      // if yes, find index of item and remove completely from cart, and save to storage.
      const itemIndex = this.shoppingcart.cartItems.indexOf(itemExistInCart);
      this.shoppingcart.cartItems.splice(itemIndex, 1);
      this.saveToSessionstorage();
    }
  }

  private saveToSessionstorage(): void {
    this.totalPriceAndItemsAmount();
    // put shoppingcart into sessoinStorage.
    sessionStorage.setItem('shopcart', JSON.stringify(this.shoppingcart));
  }

  removeFromSessionStoreage(): void {
    sessionStorage.removeItem('shopcart');
  }

  totalPriceAndItemsAmount(): void {
    let numberOfItems = 0;
    let totalPrice = 0;

    // go through each items in shoppingcart, and calculate amount of items, and there total price.
    if (this.shoppingcart.cartItems.length > 0) {
      this.shoppingcart.cartItems.forEach(item => {
        numberOfItems += item.num;
        item.item.onSale ?
        totalPrice += (item.num * (item.item.price - item.item.saleAmount)) :
        totalPrice += (item.num * item.item.price);
      });
    }
    this.itemsAmount.next(numberOfItems);

    this.shoppingcart.itemsAmount = numberOfItems;
    this.shoppingcart.totalPrice = totalPrice;
  }
}
