
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
  { id: 'andamios', name: 'Andamios', icon: HardHat },
  { id: 'anclajes', name: 'Anclajes', icon: Wrench },
  { id: 'apuntalamiento', name: 'Apuntalamiento', icon: Scaling },
  // PRODUCTOS QUIMICOS PARA CONCRETO
  { id: 'aditivos-para-concreto', name: 'Aditivos para Concreto', icon: Beaker },
  { id: 'membranas-de-curado-y-desmoldantes', name: 'Membranas de Curado y Desmoldantes', icon: SprayCan },
  { id: 'estabilizadores-de-volumen', name: 'Estabilizadores de Volumen', icon: Beaker },
  { id: 'endurecedores-para-pisos', name: 'Endurecedores para Pisos', icon: Shield },
  { id: 'impermeabilizantes-asfalticos', name: 'Impermeabilizantes Asfálticos', icon: Shield },
  { id: 'impermeabilizantes-acrilicos', name: 'Impermeabilizantes Acrílicos', icon: Shield },
  { id: 'membranas-de-refuerzo', name: 'Membranas de Refuerzo', icon: Layers },
  { id: 'epoxicos', name: 'Epóxicos', icon: Beaker },
  { id: 'repelentes', name: 'Repelentes', icon: Shield },
  { id: 'selladores', name: 'Selladores', icon: Wrench },
  { id: 'cintillas-de-respaldo', name: 'Cintillas de Respaldo', icon: CircleSlash },
  { id: 'water-stop', name: 'Water Stop', icon: ShieldBan },
  { id: 'membranas-drenantes', name: 'Membranas Drenantes', icon: Layers },
  { id: 'varios', name: 'Varios', icon: Package },
];

// Product data is now loaded from /public/data/products.json
export const products: Product[] = [];
