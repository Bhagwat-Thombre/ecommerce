export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  categoryId: string;
  isFeatured: boolean;
  isNew: boolean;
}
