export interface ProductsList {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  price: number;
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  price: number;

  //   detalles del producto
  weight: number;
  origin: string;
  curing: number;
  taste_notes: string;
}