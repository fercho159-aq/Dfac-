
import type { LucideIcon } from 'lucide-react';
import { Wrench, Scaling, HardHat, DraftingCompass, Package, Layers, ShieldBan, CircleSlash, Shield, Beaker, SprayCan, FlaskConical, Cog, Vibrate, Cable, ArrowDownUp, Power, RotateCw, CheckSquare } from 'lucide-react';

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

export interface AttributeTerm {
  id: number;
  name: string;
  slug: string;
}

export interface Attribute {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms: AttributeTerm[];
}

export interface VariationAttribute {
  name: string;
  value: string;
}

export interface Variation {
  id: number;
  attributes: VariationAttribute[];
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
  attributes?: Attribute[];
  variations?: Variation[];
}

export const categories: Category[] = [
  { id: 'accesorios', name: 'Accesorios', icon: DraftingCompass },
  { id: 'andamios', name: 'Andamios', icon: HardHat },
  { id: 'anclajes', name: 'Anclajes', icon: Wrench },
  { id: 'apuntalamiento', name: 'Apuntalamiento', icon: Scaling },
  { id: 'silletas', name: 'Silletas', icon: CheckSquare },
  { 
    id: 'maquinaria',
    name: 'Maquinaria',
    icon: Cog,
    children: [
        { id: 'bailarina', name: 'Bailarina', icon: ArrowDownUp },
        { id: 'chicote', name: 'Chicote', icon: Cable },
        { id: 'motor', name: 'Motor', icon: Power },
        { id: 'revolvedora', name: 'Revolvedora', icon: RotateCw },
        { id: 'vibradores', name: 'Vibradores', icon: Vibrate },
    ]
  },
  { 
    id: 'productos-quimicos', 
    name: 'Productos quimicos para concreto', 
    icon: FlaskConical,
    children: [
        { id: 'aditivos-para-concreto', name: 'Aditivos para concreto', icon: Beaker },
        { id: 'cintillas-de-respaldo', name: 'Cintillas de respaldo para sello de juntas', icon: CircleSlash },
        { id: 'endurecedores-para-pisos', name: 'Endurecedores para pisos', icon: Shield },
        { id: 'epoxicos', name: 'Epóxicos', icon: Beaker },
        { id: 'estabilizadores-de-volumen', name: 'Estabilizadores de volumen', icon: Beaker },
        { id: 'impermeabilizantes-acrilicos', name: 'Impermeabilizantes acrílicos', icon: Shield },
        { id: 'impermeabilizantes-asfalticos', name: 'Impermeabilizantes asfálticos', icon: Shield },
        { id: 'membranas-de-curado', name: 'Membranas de curado', icon: SprayCan },
        { id: 'membranas-de-refuerzo', name: 'Membranas de refuerzo', icon: Layers },
        { id: 'membranas-drenantes', name: 'Membranas drenantes', icon: Layers },
        { id: 'repelentes', name: 'Repelentes', icon: Shield },
        { id: 'selladores', name: 'Selladores', icon: Wrench },
        { id: 'varios', name: 'Varios', icon: Package },
        { id: 'water-stop', name: 'Water stop', icon: ShieldBan },
    ]
  },
];


// Product data is now loaded from /public/data/products.json
export const products: Product[] = [];




