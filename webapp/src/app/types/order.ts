import { CartItem } from './cartItem';

export interface Order {
  id?: number;
  items: CartItem[];
  paymentType: string;
  address: any;
  date: Date;
  status?: string;
}
