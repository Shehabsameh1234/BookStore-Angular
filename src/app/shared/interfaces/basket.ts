export interface Data {
    id: string;
    items: Item[];
    totalAmount: number;
  }
 export  interface Item {
    id: number;
    quantity: number;
    inStock: number;
    name: string;
    author: string;
    pictureUrl: string;
    price: number;
    totalPrice: number;
  }
