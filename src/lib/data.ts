import type { LucideIcon } from 'lucide-react';
import { Wrench, Scaling, HardHat, DraftingCompass } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
}

export const categories: Category[] = [
  { id: 'anclajes', name: 'Anclajes', icon: Wrench },
  { id: 'apuntalamiento', name: 'Apuntalamiento', icon: Scaling },
  { id: 'andamios', name: 'Andamios', icon: HardHat },
  { id: 'accesorios', name: 'Accesorios', icon: DraftingCompass },
];

// Product data is now loaded from /public/data/products.csv
export const products: Product[] = [];
