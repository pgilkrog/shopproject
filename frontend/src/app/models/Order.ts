import { CartItem } from './CartItem';

export interface Order {
  _id: string;
  items: CartItem[];
  totalPrice: number;
  totalNumberItems: number;
  userEmail: string;
  status: string;
  address: string;
  city: string;
}
