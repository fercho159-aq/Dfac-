import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Catálogo de Productos para Cimbra y Construcción',
  description: 'Catálogo completo de accesorios para cimbra: silletas, puntales, cuñas, moños, bandas de PVC, desmoldante, vigas H20 y más. Cotiza en línea con entrega en 24h en CDMX.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
