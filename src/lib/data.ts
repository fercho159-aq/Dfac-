
import type { LucideIcon } from 'lucide-react';
import { Wrench, Scaling, HardHat, DraftingCompass, Package, Layers, ShieldBan, CircleSlash, Shield, Beaker, SprayCan, Chemical, Building } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  children?: Category[];
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
  { id: 'andamios', name: 'Andamios', icon: HardHat },
  { id: 'anclajes', name: 'Anclajes', icon: Wrench },
  { id: 'apuntalamiento', name: 'Apuntalamiento', icon: Scaling },
  { id: 'accesorios', name: 'Accesorios', icon: DraftingCompass },
  { 
    id: 'productos-quimicos', 
    name: 'PRODUCTOS QUIMICOS PARA CONCRETO', 
    icon: Chemical,
    children: [
        { id: 'aditivos-para-concreto', name: 'ADITIVOS PARA CONCRETO', icon: Beaker },
        { id: 'cintillas-de-respaldo', name: 'CINTILLAS DE RESPALDO PARA SELLO DE JUNTAS', icon: CircleSlash },
        { id: 'endurecedores-para-pisos', name: 'ENDURECEDORES PARA PISOS', icon: Shield },
        { id: 'epoxicos', name: 'EPÓXICOS', icon: Beaker },
        { id: 'estabilizadores-de-volumen', name: 'ESTABILIZADORES DE VOLUMEN', icon: Beaker },
        { id: 'impermeabilizantes-acrilicos', name: 'IMPERMEABILIZANTES ACRÍLICOS', icon: Shield },
        { id: 'impermeabilizantes-asfalticos', name: 'IMPERMEABILIZANTES ASFÁLTICOS', icon: Shield },
        { id: 'membranas-de-curado-y-desmoldantes', name: 'MEMBRANAS DE CURADO Y DESMOLDANTES', icon: SprayCan },
        { id: 'membranas-de-refuerzo', name: 'MEMBRANAS DE REFUERZO', icon: Layers },
        { id: 'membranas-drenantes', name: 'MEMBRANAS DRENANTES', icon: Layers },
        { id: 'repelentes', name: 'REPELENTES', icon: Shield },
        { id: 'selladores', name: 'SELLADORES', icon: Wrench },
        { id: 'varios', name: 'VARIOS', icon: Package },
        { id: 'water-stop', name: 'WATER STOP', icon: ShieldBan },
    ]
  },
];


// Product data is now loaded from /public/data/products.json
export const products: Product[] = [];
