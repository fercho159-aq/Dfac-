
import type { LucideIcon } from 'lucide-react';
import { Wrench, Scaling, HardHat, DraftingCompass, Package, Layers, ShieldBan, CircleSlash, Shield, Beaker } from 'lucide-react';

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
  { id: 'selladores', name: 'Selladores', icon: Wrench },
  { id: 'varios', name: 'Varios', icon: Package },
  { id: 'membranas-drenantes', name: 'Membranas Drenantes', icon: Layers },
  { id: 'membranas-de-refuerzo', name: 'Membranas de Refuerzo', icon: Layers },
  { id: 'water-stop', name: 'Water Stop', icon: ShieldBan },
  { id: 'cintillas-de-respaldo', name: 'Cintillas de Respaldo', icon: CircleSlash },
  { id: 'repelentes', name: 'Repelentes', icon: Shield },
  { id: 'epoxicos', name: 'Epóxicos', icon: Beaker },
];

// Product data is now loaded from /public/data/products.json
export const products: Product[] = [];
