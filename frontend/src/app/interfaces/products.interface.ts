export interface ProductPicture {
  name: string;
  path: string;
  mime: string;
  size: number;
  default: boolean
}

export interface Product {
    id: string;
    _id: string;
    name: string;
    currentPrice: number;
    originalPrice: number;
    brand: string;
    stockQty: number;
    attributes: [Attribute],
    productPictures: [ProductPicture],
    primaryImage?: string;
  }
  
  export interface Attribute {
    name: string;
    value: string;
  
  }

  export interface ProductRequest {
    name: string;
    originalPrice: number;
    brand: string;  
    currentPrice: number;
    stockQty: number;
    attributes: [Attribute]
  }
  
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    qty: number;
  } 