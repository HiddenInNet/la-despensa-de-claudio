export interface ProductsList {
    name: string;
    description: string;
    image: string;
    products?: Product[];
}

export interface Product {
    name: string;
    description: string;
    image: string;
    price: number;
    unit: string;
    stock: boolean;
}