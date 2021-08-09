import { Product } from "./product.interface";

export interface ProductCart {
  product_id: string;
  cart_id: string;
  quantity: number;
  product: Product;
}
