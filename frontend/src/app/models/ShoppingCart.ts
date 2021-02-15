import { CartItem } from './CartItem';

export interface ShoppingCart {
  cartItems: CartItem[];
  totalPrice: number;
  itemsAmount: number;
}
