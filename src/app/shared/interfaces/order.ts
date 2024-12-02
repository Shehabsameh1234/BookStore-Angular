export interface Order {
  id: number;
  buyerEmail: string;
  orederDate: string;
  orderStatus: string;
  orderAddress: OrderAddress;
  deliveryMethod: string;
  orderItems: OrderItem[];
  subTotal: number;
  deliveryMethodCost: number;
  total: number;
}
export interface OrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  id: number;
}
export interface OrderAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
  basketId:string
}