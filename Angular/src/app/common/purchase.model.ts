import { Address } from './address.model';
import { Customer } from './customer';
import { OrderItem } from './order-item.model';
import { Order } from './order.model';

export class Purchase {
  orderTrackingNumber:string;
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  order: Order;
  orderItems: OrderItem[];
}
