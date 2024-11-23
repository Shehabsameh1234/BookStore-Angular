export interface RootObject {
    basketId: string;
    deliveryMethodId: number;
    OrderAddress: OrderAddress;
  }
  export interface OrderAddress {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    country: string;
  }