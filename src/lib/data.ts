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

export const products: Product[] = [
  { id: 'p1', name: 'Puntal Metálico 3m', category: 'Apuntalamiento', image: 'https://placehold.co/400x300.png', description: 'Puntal de acero reforzado, extensible hasta 3 metros. Ideal para todo tipo de losas.', price: 550.00 },
  { id: 'p2', name: 'Anclaje de Cuña 1/2"', category: 'Anclajes', image: 'https://placehold.co/400x300.png', description: 'Anclaje de expansión de cuña para concreto, alta resistencia.', price: 15.50 },
  { id: 'p3', name: 'Plataforma para Andamio', category: 'Andamios', image: 'https://placehold.co/400x300.png', description: 'Plataforma metálica antideslizante para andamios estándar.', price: 800.00 },
  { id: 'p4', name: 'Moño para Cimbra', category: 'Accesorios', image: 'https://placehold.co/400x300.png', description: 'Separador de cimbra tipo moño, varias medidas disponibles.', price: 8.75 },
  { id: 'p5', name: 'Cuña para Moño', category: 'Accesorios', image: 'https://placehold.co/400x300.png', description: 'Cuña de acero para asegurar moños en cimbra de muro.', price: 5.25 },
  { id: 'p6', name: 'Andamio Estándar 2m', category: 'Andamios', image: 'https://placehold.co/400x300.png', description: 'Marco de andamio estándar de 2m de altura, fácil de ensamblar.', price: 1200.00 },
  { id: 'p7', name: 'Viga de Apuntalamiento', category: 'Apuntalamiento', image: 'https://placehold.co/400x300.png', description: 'Viga H20 de madera para sistemas de encofrado.', price: 950.00 },
  { id: 'p8', name: 'Tornillo Nivelador', category: 'Andamios', image: 'https://placehold.co/400x300.png', description: 'Base regulable con tornillo para nivelación de andamios.', price: 150.00 },
  { id: 'p9', name: 'Anclaje Químico', category: 'Anclajes', image: 'https://placehold.co/400x300.png', description: 'Cartucho de resina epóxica para anclajes de alta carga.', price: 350.00 },
  { id: 'p10', name: 'Puntal Metálico 4m', category: 'Apuntalamiento', image: 'https://placehold.co/400x300.png', description: 'Puntal de acero reforzado, extensible hasta 4 metros.', price: 650.00 },
  { id: 'p11', name: 'Silleta Plástica', category: 'Accesorios', image: 'https://placehold.co/400x300.png', description: 'Separador plástico para calzar acero de refuerzo.', price: 2.50 },
  { id: 'p12', name: 'Rueda para Andamio', category: 'Andamios', image: 'https://placehold.co/400x300.png', description: 'Rueda giratoria con freno para andamios móviles.', price: 250.00 },
];
