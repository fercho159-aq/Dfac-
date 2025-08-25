import type { LucideIcon } from 'lucide-react';
import { Wrench, Scaling, HardHat, DraftingCompass } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface ProductImage {
  id: number;
  src: string;
  thumbnail: string;
  name: string;
  alt: string;
}
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  images?: ProductImage[];
  description: string;
  price: number;
}

export const categories: Category[] = [
  { id: 'anclajes', name: 'Anclajes', icon: Wrench },
  { id: 'apuntalamiento', name: 'Apuntalamiento', icon: Scaling },
  { id: 'andamios', name: 'Andamios', icon: HardHat },
  { id: 'accesorios', name: 'Accesorios', icon: DraftingCompass },
];

// Product data is now loaded from /public/data/products.json
export const products: Product[] = [];
