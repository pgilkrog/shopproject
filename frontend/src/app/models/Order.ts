export interface Order {
  _id: string;
  items: any[];
  totalPrice: number;
  totalNumberItems: number;
  userEmail: string;
  status: string;
  address: string;
  city: string;
}
