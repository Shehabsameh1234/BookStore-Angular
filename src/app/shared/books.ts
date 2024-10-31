export interface Data {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: Books[];
  }
 export interface Books {
    id: number ;
    name: string;
    author: string;
    description: string;
    pictureUrl: string;
    price: number;
    inStock: number;
    categoryId: number;
    category: string;
  }