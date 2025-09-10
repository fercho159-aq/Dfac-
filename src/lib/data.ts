
import type { LucideIcon } from 'lucide-react';
import { Wrench, Scaling, HardHat, DraftingCompass, Package, Layers, ShieldBan, CircleSlash, Shield, Beaker, SprayCan } from 'lucide-react';

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
  { id: 'accesorios', name: 'Accesorios', icon: DraftingCompass },
  { id: 'aditivos-para-concreto', name: 'Aditivos para Concreto', icon: Beaker },
  { id: 'andamios', name: 'Andamios', icon: HardHat },
  { id: 'anclajes', name: 'Anclajes', icon: Wrench },
  { id: 'apuntalamiento', name: 'Apuntalamiento', icon: Scaling },
  { id: 'cintillas-de-respaldo', name: 'Cintillas de Respaldo', icon: CircleSlash },
  { id: 'endurecedores-para-pisos', name: 'Endurecedores para Pisos', icon: Shield },
  { id: 'epoxicos', name: 'Epóxicos', icon: Beaker },
  { id: 'estabilizadores-de-volumen', name: 'Estabilizadores de Volumen', icon: Beaker },
  { id: 'impermeabilizantes-acrilicos', name: 'Impermeabilizantes Acrílicos', icon: Shield },
  { id: 'membranas-de-curado-y-desmoldantes', name: 'Membranas de Curado y Desmoldantes', icon: SprayCan },
  { id: 'membranas-de-refuerzo', name: 'Membranas de Refuerzo', icon: Layers },
  { id: 'membranas-drenantes', name: 'Membranas Drenantes', icon: Layers },
  { id: 'repelentes', name: 'Repelentes', icon: Shield },
  { id: 'selladores', name: 'Selladores', icon: Wrench },
  { id: 'varios', name: 'Varios', icon: Package },
  { id: 'water-stop', name: 'Water Stop', icon: ShieldBan },
];

// Product data is now loaded from /public/data/products.json
export const products: Product[] = [];
