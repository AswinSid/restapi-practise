export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_qty: number;
  is_Live: boolean;
  category_id: string;
  created_At: string;
}

export type CreateProductInput = Omit<Product, "id" | "created_at">;

export type UpdateProductInput = Partial<CreateProductInput>;
