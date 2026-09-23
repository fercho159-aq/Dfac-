

import Image from 'next/image';
import { Product, ProductImage, Attribute, AttributeTerm } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';
import { ContactSection } from '@/components/contact-section';
import { ProductCard } from '@/components/product-card';
import { Suspense } from 'react';
import { WhatsAppButton } from './WhatsAppButton';

const FICHAS_TECNICAS: Record<string, string[]> = {
  'barra-roscada-2': [
    '/archivos/fichas-tecnicas/ficha-tecnica-barra-roscada-descripcion.pdf',
    '/archivos/fichas-tecnicas/ficha-tecnica-barra-roscada-aplicacion.pdf',
  ],
  'tuerca-mariposa-con-base': [
    '/archivos/fichas-tecnicas/ficha-tecnica-tuerca-mariposa-con-base-5-8.pdf',
  ],
  'tubo-para-barra-roscada': [
    '/archivos/fichas-tecnicas/ficha-tecnica-tubo-para-barra-roscada.pdf',
  ],
  'cono-para-cimbra': [
    '/archivos/fichas-tecnicas/ficha-tecnica-cono-para-cimbra.pdf',
  ],
};

// New component for related products
function RelatedProducts({ products, searchParams }: { products: Product[], searchParams: { [key: string]: string | string[] | undefined } }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Productos Relacionados</h2>
          <p className="mt-4 text-lg text-muted-foreground">También te podría interesar</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} searchParams={searchParams} />
          ))}
        </div>
      </div>
    </section>
  );
}

function cleanSearchParams(params: { [key: string]: string | string[] | undefined }): Record<string, string> {
  const cleaned: Record<string, string> = {};
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (typeof value === 'string') {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
}


// This is a new Client Component that will handle the interactive parts.
function ProductDetailsClient({ product, relatedProducts, searchParams }: { product: Product, relatedProducts: Product[], searchParams: { [key: string]: string | string[] | undefined } }) {
  if (!product) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">Producto no encontrado.</div>;
  }

  const galleryImages = [
    { src: "/Image/Galeria/CARRUSEL-DFAC-D5.jpg", alt: "Proyecto de construcción 1", hint: "construction architecture" },
    { src: "/Image/Galeria/1620841038-3.jpg", alt: "Detalle de andamio", hint: "scaffolding detail" },
    { src: "/Image/Galeria/CARRUSEL-DFAC2-D5.jpg", alt: "Equipo trabajando en obra", hint: "construction workers" },
    { src: "/Image/Galeria/CARRUSEL-DFAC14-D5.jpg", alt: "Estructura de edificio", hint: "building structure" },
    { src: "/Image/Galeria/CARRUSEL-DFAC4-D6.jpg", alt: "Estructura de edificio 2", hint: "building structure" },
    { src: "/Image/Galeria/CARRUSEL-DFAC7-D5.jpg", alt: "Material de cimbra", hint: "formwork materials" },
    { src: "/Image/Galeria/CARRUSEL-DFAC12-D5.jpg", alt: "Vista aérea de construcción", hint: "construction site aerial" },
    { src: "/Image/Galeria/CARRUSEL-DFAC11-D5.jpg", alt: "Detalle de puntal", hint: "shoring post" },
    { src: "/Image/Galeria/CARRUSEL-DFAC3-D5.jpg", alt: "Proyecto de construcción 3", hint: "construction site" },
    { src: "/Image/Galeria/CARRUSEL-DFAC23-D5.jpg", alt: "Material de andamio", hint: "scaffolding material" },
    { src: "/Image/Galeria/CARRUSEL-DFAC8-D5.jpg", alt: "Trabajador de construcción", hint: "construction worker" },
    { src: "/Image/Galeria/CARRUSEL-DFAC9-D5.jpg", alt: "Cimbra para construcción", hint: "formwork" },
  ];

  const medidaAttribute = product.attributes?.find(attr => attr.name === 'Medida');
  const whatsappMessage = `Hola, me interesa el producto *${product.name}* para una entrega urgente.`;
  const whatsappUrl = `https://wa.me/525564220884?text=${encodeURIComponent(whatsappMessage)}`;
  const productsLink = `/products?${new URLSearchParams(cleanSearchParams(searchParams))}`;
  const fichaTecnicaUrls = FICHAS_TECNICAS[product.slug];


  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href={productsLink} className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver al catálogo
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <div className="space-y-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images && product.images.length > 0 ? (
                    product.images.map((img: ProductImage) => (
                      <CarouselItem key={img.id}>
                        <div className="aspect-square relative w-full overflow-hidden rounded-lg border">
                          <Image
                            src={img.src || 'https://placehold.co/600x600.png'}
                            alt={product.name}
                            fill
                            className="object-contain"
                            data-ai-hint="product image"
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="aspect-square relative w-full overflow-hidden rounded-lg border">
                        <Image
                          src={product.image || 'https://placehold.co/600x600.png'}
                          alt={product.name}
                          fill
                          className="object-contain"
                          data-ai-hint="product image placeholder"
                        />
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                {product.images && product.images.length > 1 && (
                  <>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                  </>
                )}
              </Carousel>
              {product.slug === 'barra-roscada-2' && (
                <p className="text-xs text-slate-500 text-center italic mt-2">* La compra de la barra roscada no incluye la tuerca mariposa. Consulta nuestros productos complementarios.</p>
              )}
            </div>

            {/* Product Info */}
            <div>
              <Badge variant="secondary">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold my-2">{product.name}</h1>
              <p className="text-3xl font-bold text-primary mb-4">
                Precio a cotizar
              </p>
              {product.slug === 'banda-de-pvc-negra-ojillada' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Cumple con la Norma CRD-C-572</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800">
                    Es un sello retenedor de agua color negro, elaborado a base de cloruro de polivinilo en forma de cinta flexible con bulbo central y laterales estriados. Diseñado para garantizar la impermeabilidad en juntas frías de construcción.
                  </p>
                </div>
              ) : product.slug === 'tirante-tipo-mono' ? (
                <div className="product-description font-sans">
                  <h2 className="text-2xl md:text-3xl font-light text-slate-700 uppercase mb-6">MOÑOS SEPARADORES PARA CIMBRA</h2>
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-6 w-full md:w-auto text-center">
                    <h3 className="text-center text-xl md:text-2xl text-white m-0">Moño separador para cimbra de madera</h3>
                  </div>
                  <h4 className="text-center md:text-left text-lg md:text-xl font-medium text-slate-700 mb-8">Usados en cimbras para muros de concreto</h4>
                  <p className="text-sm md:text-base text-slate-800 mb-4">Amigo constructor si busca moños o tirantes rompibles para sujetar la cimbra de madera para muros de concreto, le ofrecemos tirantes rompibles (moños) de diversas medidas según el ancho especificado para su muro. Contamos con medidas desde 10 cm hasta medidas especiales mayores a 45 cm de ancho en muros de concreto y gruesos de cimbrado de 23 cm.</p>
                  <p className="text-sm md:text-base text-slate-800 mb-10">Los tirantes rompibles, son elementos de acero, de alto carbón que sirve para retener las paredes de la cimbra, antes, durante y después del vaciado del concreto. Tiene una capacidad de 1,350 kg a la tracción cada uno (3,000 lbs).</p>
                  <div className="w-full border-t border-slate-300 mt-8 pt-8">
                    <h3 className="text-center text-lg md:text-xl font-medium text-slate-700 mb-8">Opción de tirante con rondana de neopreno</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <h4 className="text-center md:text-left mb-4 text-slate-700 font-medium">Corte instalación</h4>
                      <p className="text-sm text-slate-800">La pata del moño tiene un estándar de 23 cm para el ajuste de la cimbra (barrotes y polines) y cerrados por una cuña de acero en cada uno de los extremos.</p>
                    </div>
                    <div>
                      <h4 className="text-center md:text-left mb-4 text-slate-700 font-medium">Instalación en Triplay</h4>
                      <p className="text-sm text-slate-800">Para la instalación se recomienda 8 moños por hoja de triplay de 1.22 x 2.44, colocando el primero a escuadra a 30 cm con una separación de 60 cm.</p>
                    </div>
                  </div>
                  <h3 className="text-center text-lg md:text-xl font-medium text-slate-700 mb-4">Tabla de medidas</h3>
                  <h4 className="text-center md:text-left text-base md:text-lg font-medium text-slate-700 mb-2">Disponibilidad y Tiempos de Entrega</h4>
                  <p className="text-sm md:text-base text-slate-800 mb-8">¿Necesitas medidas mayores a 40 cm? No esperes semanas. Contamos con un servicio de fabricación acelerada con entregas a partir de las 24 a 72 horas. Para medidas estándar (10 a 40 cm), garantizamos entrega inmediata según existencias.</p>

                  {/* Sección técnica: Proceso de instalación */}
                  <div className="w-full border-t border-slate-300 mt-8 pt-8">
                    <h3 className="text-center text-lg md:text-xl font-medium text-slate-700 mb-2">Proceso Técnico de Instalación</h3>
                    <p className="text-center text-sm text-slate-500 mb-8">Así se ven nuestros moños en obra real</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                          <Image
                            src="/Image/mono-proceso-muro-concreto.jpeg"
                            alt="Moños instalados en muro de concreto - vista de acabado final"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs md:text-sm text-slate-600 text-center"><strong>Acabado final:</strong> Moños embebidos en muro de concreto después del descimbrado. Se observa la distribución uniforme de los tirantes y las juntas de colado.</p>
                      </div>
                      <div className="space-y-3">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                          <Image
                            src="/Image/mono-proceso-construccion.jpeg"
                            alt="Proceso de cimbrado con moños en obra de construcción"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs md:text-sm text-slate-600 text-center"><strong>En proceso de cimbrado:</strong> Vista de la colocación de moños durante el armado de muros. Los tirantes mantienen la separación precisa entre las caras de la cimbra antes del vaciado.</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 md:p-6">
                      <h4 className="text-sm md:text-base font-semibold text-slate-700 mb-3">Especificaciones técnicas de instalación</h4>
                      <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span>Los moños se insertan a través de perforaciones en las caras de la cimbra, asegurando la separación exacta del muro.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span>Se fijan en cada extremo con cuñas de acero que impiden el movimiento durante el vaciado.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span>Después del fraguado, las patas del moño se rompen al ras del muro gracias a los puntos de quiebre diseñados en la pieza.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span>Capacidad de carga: <strong>1,350 kg a la tracción</strong> (3,000 lbs) por tirante.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : product.slug === 'tubo-para-barra-roscada' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Diámetro 22 mm · Para barra de 5/8&quot; · 2 m y 3 m</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    El tubo para barra roscada está diseñado para proteger la barra roscada durante el colado de muros y columnas, evitando que el concreto se adhiera a la barra y permitiendo su recuperación para usos posteriores.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Diámetro interior</p>
                      <p className="text-base font-bold text-slate-800">22 mm</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Compatibilidad</p>
                      <p className="text-base font-bold text-slate-800">Barra 5/8&quot;</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Presentación</p>
                      <p className="text-base font-bold text-slate-800">2 m y 3 m</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Función</p>
                      <p className="text-base font-bold text-slate-800">Protección</p>
                    </div>
                  </div>
                </div>
              ) : product.slug === 'cono-para-cimbra' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Polipropileno · Compatible con barra 5/8&quot; · Reutilizable</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    El cono para cimbra es un accesorio diseñado para garantizar un acabado uniforme y de alta calidad en muros y columnas de concreto. Fabricado en poliestireno rígido de alta resistencia, permite mantener el espesor adecuado de la cimbra y proteger la barra durante el proceso de colado.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Material</p>
                      <p className="text-base font-bold text-slate-800">Polipropileno</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Compatibilidad</p>
                      <p className="text-base font-bold text-slate-800">Barra 5/8&quot;</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Reutilizable</p>
                      <p className="text-base font-bold text-slate-800">Sí</p>
                    </div>
                  </div>
                </div>
              ) : product.slug === 'tuerca-mariposa-con-base' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Acero forjado · Para barra de 5/8&quot; · 22,000 lb</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Tuerca mariposa con base para barra roscada de 5/8&quot;, fabricada en acero de alta resistencia y forjada en una sola pieza. Su base integrada proporciona una mayor superficie de apoyo para ayudar a distribuir las cargas sobre la cimbra, permitiendo un ajuste firme y seguro durante la instalación.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Compatibilidad</p>
                      <p className="text-base font-bold text-slate-800">5/8&quot;</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Material</p>
                      <p className="text-base font-bold text-slate-800">Acero forjado</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Resistencia</p>
                      <p className="text-base font-bold text-slate-800">22,000 lb</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Tipo</p>
                      <p className="text-base font-bold text-slate-800">Reutilizable</p>
                    </div>
                  </div>
                </div>
              ) : product.slug === 'barra-roscada-2' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Cold Rolled · Diámetro 5/8&quot; · Tramos de 6 m</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Barra cold roll de alta resistencia, fabricada por rolado en frío (COLD ROLLED) en diámetro de 5/8&quot; con hilo de alta resistencia (cuerda rápida), para usarse como separador y soporte de cimbra de muros y columnas. Se utiliza para fijar moldes o cimbras de elementos de concreto de gran volumen.
                  </p>

                  {/* Datos tecnicos rapidos */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Diámetro</p>
                      <p className="text-base font-bold text-slate-800">5/8&quot;</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Longitud</p>
                      <p className="text-base font-bold text-slate-800">6 m</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Carga máxima</p>
                      <p className="text-base font-bold text-slate-800">14,950 kgf</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Esfuerzo máximo</p>
                      <p className="text-base font-bold text-slate-800">7,550 kgf/cm²</p>
                    </div>
                  </div>

                  {/* Cortes a la medida */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-5">
                    <h4 className="text-base md:text-lg font-bold text-blue-800 mb-2">Cortes a cualquier medida</h4>
                    <p className="text-sm md:text-base text-slate-700">
                      En DFAC cortamos la barra roscada para cimbra <strong>a la medida que necesites</strong>. El tramo estándar es de 6 m, pero lo modulamos según los requerimientos de tu obra, sin costo de desperdicio por tramos que no vas a usar. Solicita tu medida al cotizar.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
              )}

              {medidaAttribute && medidaAttribute.terms.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Medidas Disponibles:</h3>
                  <div className="flex flex-wrap gap-2">
                    {medidaAttribute.terms.map((term: AttributeTerm) => (
                      <Badge key={term.id} variant="outline">{term.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Solicitar cotización
                  </Link>
                </Button>
                <WhatsAppButton url={whatsappUrl} />
                {fichaTecnicaUrls && fichaTecnicaUrls.map((url, i) => (
                  <Button
                    key={url}
                    size="lg"
                    asChild
                    className="h-auto py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg shadow-amber-500/40 ring-2 ring-amber-300 ring-offset-2 transition-transform hover:scale-[1.02]"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3"
                    >
                      <FileText className="w-6 h-6 shrink-0" />
                      <span className="flex flex-col items-start leading-tight">
                        <span className="text-base">Descargar ficha técnica{fichaTecnicaUrls.length > 1 ? ` ${i + 1}` : ''}</span>
                        <span className="text-xs font-medium text-amber-50">PDF con medidas y especificaciones</span>
                      </span>
                      <Download className="w-5 h-5 shrink-0" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Banda de PVC - Detailed info sections below the grid */}
          {product.slug === 'banda-de-pvc-negra-ojillada' && (
            <div className="mt-16 space-y-12">
              {/* Usos */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Usos</h3>
                <p className="text-muted-foreground mb-6">Para la retención de agua, con o sin presión en la junta fría de la unión de colados en:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Canales', 'Cimentaciones', 'Ductos', 'Albercas', 'Sifones', 'Pisos', 'Muros', 'Vertedores'].map((uso) => (
                    <div key={uso} className="bg-card border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-slate-700">{uso}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cualidades */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Cualidades</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Absorción de movimientos</h4>
                    <p className="text-sm text-slate-700">Absorbe todos los movimientos tanto horizontales como verticales que las estructuras puedan sufrir sin desgarrarse ni cortarse.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Fácil adherencia</h4>
                    <p className="text-sm text-slate-700">Es fácilmente adherible debido a su naturaleza termoplástica.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Alta resistencia</h4>
                    <p className="text-sm text-slate-700">Tiene alta resistencia al envejecimiento. Conserva sus propiedades permanentemente.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Resistencia química</h4>
                    <p className="text-sm text-slate-700">Rechaza eficazmente la acción agresiva de las soluciones ácidas y alcalinas.</p>
                  </div>
                </div>
              </div>

              {/* Aplicación */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Aplicación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-700 mb-3">Disposición Vertical</h4>
                    <p className="text-sm text-slate-700 mb-2">Para canales, cimentaciones, ductos, albercas, muros, etc., que se colarán en dos o más etapas.</p>
                    <p className="text-sm text-slate-600">La solapa inferior de la banda deberá quedar ahogada a la mitad del espesor del primer colado. Para fijarla, se amarra con alambre recocido a través de los ojillos a la varilla.</p>
                  </div>
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-700 mb-3">Disposición Horizontal</h4>
                    <p className="text-sm text-slate-700 mb-2">Se emplea en losas, bases de albercas o en pavimentos de concreto.</p>
                    <p className="text-sm text-slate-600">Fijar el bulbo central entre dos tramos de la cimbra que contendrá el concreto. Amarrar las solapas (interna y externa) a través de los ojillos al acero y a la cimbra.</p>
                  </div>
                </div>
              </div>

              {/* Especificaciones Técnicas + Presentación side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Especificaciones Técnicas</h3>
                  <div className="overflow-hidden rounded-xl border shadow-sm">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="text-left p-4">Prueba</th>
                          <th className="text-left p-4">Especificación</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200">
                          <td className="p-4 font-medium text-slate-700">Consistencia</td>
                          <td className="p-4 text-slate-600">Banda Flexible</td>
                        </tr>
                        <tr className="border-b border-slate-200 bg-slate-50">
                          <td className="p-4 font-medium text-slate-700">Color</td>
                          <td className="p-4 text-slate-600">Negro</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-4 font-medium text-slate-700">Dureza Shore A</td>
                          <td className="p-4 text-slate-600">75 – 85</td>
                        </tr>
                        <tr className="border-b border-slate-200 bg-slate-50">
                          <td className="p-4 font-medium text-slate-700">Resistencia a la Tensión</td>
                          <td className="p-4 text-slate-600">120 kg/cm² mínimo</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-4 font-medium text-slate-700">Porcentaje de Elongación</td>
                          <td className="p-4 text-slate-600">280% mínimo</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-medium text-slate-700">% Absorción de Agua</td>
                          <td className="p-4 text-slate-600">10.0% máxima</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Presentación y Rendimiento</h3>
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex items-start gap-3">
                          <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">•</span>
                          <span>Disponible en medidas de <strong>4", 6", 7.5", 9" y 12"</strong> de ancho.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">•</span>
                          <span>Se vende por rollo de <strong>25 metros lineales</strong>.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">•</span>
                          <span>Rendimiento: <strong>25 mts. lineales por rollo</strong>.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <h4 className="text-base font-bold text-amber-800 mb-2">Recomendaciones</h4>
                      <p className="text-sm text-slate-700">No debe ser traslapada, debe unirse perfectamente entre sí, mediante fusión por calor.</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                      <h4 className="text-base font-bold text-green-800 mb-2">Almacenaje</h4>
                      <p className="text-sm text-slate-700">Conserva sus propiedades permanentemente. Almacénelo estibado sobre tarima y bajo techo.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medidas de Seguridad */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-800 mb-3">Medidas de Seguridad</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-0.5">⚠</span>
                    <span>Al hacer la unión con calor, deberá cuidar de no inhalar los gases de combustión, ni tener contacto con la piel para evitar quemaduras.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-0.5">⚠</span>
                    <span>No se deje al alcance de los niños.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tubo para Barra Roscada - Detailed info sections below the grid */}
          {product.slug === 'tubo-para-barra-roscada' && (
            <div className="mt-16 space-y-12">
              {/* Descripción extendida */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Protección para barra roscada de 5/8&quot;</h3>
                <p className="text-sm md:text-base text-slate-800 mb-4">
                  El tubo para barra roscada está diseñado para proteger la barra roscada durante el colado de muros y columnas, evitando que el concreto se adhiera a la barra y permitiendo su recuperación para usos posteriores.
                </p>
                <p className="text-sm md:text-base text-slate-800">
                  Con un diámetro interior de 22 mm, facilita la correcta alineación y separación de la cimbra, garantizando precisión en los espesores. Se corta fácilmente a la medida del elemento a colar y se instala entre conos de cimbra en cada extremo, quedando integrada en el concreto tras el descimbrado.
                </p>
              </div>

              {/* Especificaciones tecnicas */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Especificaciones Técnicas</h3>
                <div className="overflow-hidden rounded-xl border shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="text-left p-4">Característica</th>
                        <th className="text-left p-4">Especificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Diámetro interior', '22 mm'],
                        ['Compatibilidad', 'Barra roscada de 5/8"'],
                        ['Función', 'Proteger la barra roscada durante el colado'],
                        ['Instalación', 'Se coloca entre conos de cimbra en cada extremo'],
                        ['Presentaciones', 'Tubo de 2 M. de 5/8" y Tubo de 3 M. de 5/8"'],
                        ['Corte', 'Se corta fácilmente a la medida del elemento a colar'],
                        ['Reutilizable', 'Permite la recuperación de la barra para usos posteriores'],
                      ].map(([caracteristica, especificacion], index) => (
                        <tr key={caracteristica} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
                          <td className="p-4 font-medium text-slate-700 align-top whitespace-nowrap">{caracteristica}</td>
                          <td className="p-4 text-slate-600">{especificacion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ¿Cómo se instala? */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">¿Cómo se instala?</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <ul className="space-y-3 text-sm md:text-base text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">1.</span>
                      <span>Se corta el tubo a la medida del espesor del elemento de concreto a colar.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">2.</span>
                      <span>Se coloca sobre la barra roscada, entre los <strong>conos de cimbra</strong> en cada extremo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">3.</span>
                      <span>Se fija el sistema con <strong>tuercas mariposa con base</strong> para asegurar la separación.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">4.</span>
                      <span>Tras el descimbrado, el tubo queda integrado en el concreto y la barra roscada se recupera limpia para reutilizar.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Usos */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Usos</h3>
                <p className="text-muted-foreground mb-6">Protección de la barra roscada en el colado de:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Muros', 'Columnas', 'Trabes', 'Elementos de gran espesor'].map((uso) => (
                    <div key={uso} className="bg-card border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-slate-700">{uso}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Presentación */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Presentación</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Tubo de 2 M. de 5/8&quot;</h4>
                    <p className="text-sm text-slate-700">Tubo de 2 metros de largo con diámetro interior de 22 mm, compatible con barra roscada de 5/8&quot;.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Tubo de 3 M. de 5/8&quot;</h4>
                    <p className="text-sm text-slate-700">Tubo de 3 metros de largo con diámetro interior de 22 mm, compatible con barra roscada de 5/8&quot;.</p>
                  </div>
                </div>
              </div>

              {/* Ficha tecnica */}
              {fichaTecnicaUrls && (
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Ficha técnica en PDF</h3>
                    <p className="text-sm md:text-base text-muted-foreground">Descarga la ficha completa con especificaciones del tubo para barra roscada.</p>
                  </div>
                  <Button
                    size="lg"
                    asChild
                    className="h-auto py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg shadow-amber-500/40 transition-transform hover:scale-[1.02]"
                  >
                    <a
                      href={fichaTecnicaUrls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 whitespace-nowrap"
                    >
                      <FileText className="w-6 h-6 shrink-0" />
                      Descargar ficha técnica
                      <Download className="w-5 h-5 shrink-0" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Tuerca Mariposa con Base - Detailed info sections below the grid */}
          {product.slug === 'tuerca-mariposa-con-base' && (
            <div className="mt-16 space-y-12">
              {/* Descripción extendida */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Accesorio para barra roscada de 5/8&quot;</h3>
                <p className="text-sm md:text-base text-slate-800 mb-4">
                  Tuerca mariposa con base para barra roscada de 5/8&quot;, fabricada en acero de alta resistencia y forjada en una sola pieza. Su base integrada proporciona una mayor superficie de apoyo para ayudar a distribuir las cargas sobre la cimbra, permitiendo un ajuste firme y seguro durante la instalación.
                </p>
                <p className="text-sm md:text-base text-slate-800">
                  Es un accesorio complementario de la barra roscada, utilizado para el aseguramiento de sistemas de cimbra en elementos de concreto como muros, columnas y trabes. Además, es reutilizable, resistente a cargas superiores a 22,000 lb y de fácil instalación y desmontaje.
                </p>
              </div>

              {/* Cualidades */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Cualidades</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Instalación rápida y segura</h4>
                    <p className="text-sm text-slate-700">El diseño de mariposa permite un ajuste eficiente sin herramientas especializadas.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Reutilizable y rentable</h4>
                    <p className="text-sm text-slate-700">Ideal para múltiples usos sin comprometer la resistencia ni el rendimiento.</p>
                  </div>
                </div>
              </div>

              {/* Especificaciones tecnicas */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Especificaciones Técnicas</h3>
                <div className="overflow-hidden rounded-xl border shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="text-left p-4">Característica</th>
                        <th className="text-left p-4">Especificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Compatibilidad', 'Diseñada para usar con barra roscada de 5/8"'],
                        ['Material', 'Acero de alta resistencia, forjado en una sola pieza'],
                        ['Resistencia', 'Hasta 22,000 libras de carga'],
                        ['Función', 'Complemento de fijación para sistemas de cimbra'],
                        ['Usos recomendados', 'Construcción de muros, columnas, trabes y elementos de gran espesor'],
                      ].map(([caracteristica, especificacion], index) => (
                        <tr key={caracteristica} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
                          <td className="p-4 font-medium text-slate-700 align-top whitespace-nowrap">{caracteristica}</td>
                          <td className="p-4 text-slate-600">{especificacion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ¿Cómo se instala? */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">¿Cómo se instala?</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <p className="text-sm md:text-base text-slate-700">
                    La barra roscada se introduce atravesando la cimbra de madera y se fija con <strong>tuercas mariposa con base</strong> en ambos extremos para regular la separación entre las caras de la cimbra. Este sistema permite un ajuste preciso y seguro del espesor del elemento a colar.
                  </p>
                </div>
              </div>

              {/* Usos */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Usos</h3>
                <p className="text-muted-foreground mb-6">Construcción de elementos de concreto que requieren cimbra con separación precisa:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Muros', 'Columnas', 'Trabes', 'Elementos de gran espesor'].map((uso) => (
                    <div key={uso} className="bg-card border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-slate-700">{uso}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ficha tecnica */}
              {fichaTecnicaUrls && (
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Ficha técnica en PDF</h3>
                    <p className="text-sm md:text-base text-muted-foreground">Descarga la ficha completa con especificaciones de la tuerca mariposa con base de 5/8&quot;.</p>
                  </div>
                  <Button
                    size="lg"
                    asChild
                    className="h-auto py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg shadow-amber-500/40 transition-transform hover:scale-[1.02]"
                  >
                    <a
                      href={fichaTecnicaUrls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 whitespace-nowrap"
                    >
                      <FileText className="w-6 h-6 shrink-0" />
                      Descargar ficha técnica
                      <Download className="w-5 h-5 shrink-0" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Cono para Cimbra - Detailed info sections below the grid */}
          {product.slug === 'cono-para-cimbra' && (
            <div className="mt-16 space-y-12">
              {/* Descripción extendida */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Accesorio para sistema de cimbra</h3>
                <p className="text-sm md:text-base text-slate-800 mb-4">
                  El cono para cimbra es un accesorio diseñado para garantizar un acabado uniforme y de alta calidad en muros y columnas de concreto. Fabricado en poliestireno rígido de alta resistencia, permite mantener el espesor adecuado de la cimbra y proteger la barra durante el proceso de colado.
                </p>
                <p className="text-sm md:text-base text-slate-800 mb-4">
                  Su diseño contribuye a reducir filtraciones y favorecer la impermeabilidad de la estructura, por lo que es especialmente útil en aplicaciones como cisternas, albercas y muros de contención.
                </p>
                <p className="text-sm md:text-base text-slate-800">
                  Además, facilita las labores de instalación, retiro y resane, optimizando los tiempos de trabajo y contribuyendo a obtener acabados más limpios y precisos en los elementos de concreto.
                </p>
              </div>

              {/* Ventajas */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Ventajas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Control preciso del espesor del muro</h4>
                    <p className="text-sm text-slate-700">Mantiene la separación adecuada entre las placas de cimbra, permitiendo obtener espesores uniformes y colados de alta calidad.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Ayuda a prevenir filtraciones</h4>
                    <p className="text-sm text-slate-700">Su diseño contribuye a proteger los orificios generados por la barra roscada, siendo una solución adecuada para estructuras con contacto con agua, como albercas, cisternas y muros de contención.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Instalación y retiro sencillos</h4>
                    <p className="text-sm text-slate-700">Se coloca fácilmente sobre la barra roscada y permite un retiro práctico durante el proceso de descimbrado.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Protección de la barra roscada</h4>
                    <p className="text-sm text-slate-700">Reduce el contacto directo de la barra con el concreto, facilitando su recuperación y reutilización en diferentes proyectos.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 md:col-span-2">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Resistencia y durabilidad</h4>
                    <p className="text-sm text-slate-700">Fabricado con materiales de alta resistencia, soporta las condiciones generadas por el concreto fresco, manteniendo su integridad durante el proceso de colado.</p>
                  </div>
                </div>
              </div>

              {/* Especificaciones técnicas */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Especificaciones técnicas</h3>
                <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                  <table className="w-full text-sm">
                    <tbody className="divide-y">
                      <tr className="bg-slate-50"><td className="px-4 py-3 font-medium text-slate-700 w-1/2">Material</td><td className="px-4 py-3 text-slate-600">Polipropileno o plástico de alta resistencia</td></tr>
                      <tr><td className="px-4 py-3 font-medium text-slate-700">Diámetro interior</td><td className="px-4 py-3 text-slate-600">Compatible con barra roscada de 5/8&quot;</td></tr>
                      <tr className="bg-slate-50"><td className="px-4 py-3 font-medium text-slate-700">Reutilizable</td><td className="px-4 py-3 text-slate-600">Sí, siempre que no presente daños visibles</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ¿Cómo se instala? */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">¿Cómo se instala el cono para cimbra?</h3>
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
                  <p className="text-sm md:text-base text-slate-700">
                    Se coloca entre la cimbra y la tuerca mariposa con base, cubriendo el extremo del tubo para barra roscada.
                  </p>
                </div>
              </div>

              {/* Usos */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Usos</h3>
                <p className="text-muted-foreground mb-6">Es especialmente útil en estructuras que requieren impermeabilidad y acabados uniformes.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Muros', 'Columnas', 'Cisternas', 'Albercas'].map((uso) => (
                    <div key={uso} className="bg-card border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-slate-700">{uso}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ficha tecnica */}
              {fichaTecnicaUrls && (
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Ficha técnica en PDF</h3>
                    <p className="text-sm md:text-base text-muted-foreground">Descarga la ficha completa con especificaciones del cono para cimbra.</p>
                  </div>
                  <Button
                    size="lg"
                    asChild
                    className="h-auto py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg shadow-amber-500/40 transition-transform hover:scale-[1.02]"
                  >
                    <a
                      href={fichaTecnicaUrls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 whitespace-nowrap"
                    >
                      <FileText className="w-6 h-6 shrink-0" />
                      Descargar ficha técnica
                      <Download className="w-5 h-5 shrink-0" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Barra Roscada - Detailed info sections below the grid */}
          {product.slug === 'barra-roscada-2' && (
            <div className="mt-16 space-y-12">
              {/* Usos */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Usos</h3>
                <p className="text-muted-foreground mb-6">La barra roscada para cimbra de 5/8&quot; se emplea principalmente para la colocación y aseguramiento de cimbras de madera en la construcción de muros, trabes y columnas, especialmente en proyectos donde los espesores de colado son grandes y se requiere una sujeción robusta y precisa.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Muros', 'Trabes', 'Columnas', 'Colados de gran espesor'].map((uso) => (
                    <div key={uso} className="bg-card border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-slate-700">{uso}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cualidades */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Cualidades</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Cimbrado más rápido</h4>
                    <p className="text-sm text-slate-700">Permite una mayor rapidez en el cimbrado y descimbrado de muros y columnas.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Alta resistencia</h4>
                    <p className="text-sm text-slate-700">Está rolada en frío, por lo que tiene una resistencia mayor a 20,000 lb con un factor de seguridad de 2.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Espesores uniformes</h4>
                    <p className="text-sm text-slate-700">Se obtienen espesores más uniformes en las piezas coladas y prolonga la vida útil de la cimbra evitando abocardamientos.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Modulable y reutilizable</h4>
                    <p className="text-sm text-slate-700">Disponible en longitudes de 6 m, se corta fácilmente para modularla a la necesidad de la obra y es reutilizable.</p>
                  </div>
                </div>
              </div>

              {/* Especificaciones tecnicas */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Especificaciones Técnicas</h3>
                <div className="overflow-hidden rounded-xl border shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="text-left p-4">Característica</th>
                        <th className="text-left p-4">Especificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Diámetro', '5/8”'],
                        ['Fabricación', 'Rolado en frío (cold rolled)'],
                        ['Resistencia', 'Mayor a 20,000 lb (factor de seguridad 2)'],
                        ['Longitud', '6.00 metros'],
                        ['Material', 'Acero de alta resistencia'],
                        ['Compatibilidad', 'Tuerca mariposa con base + tubo plástico + cono separador'],
                        ['Aplicación', 'Para cimbras en muros, trabes y columnas'],
                        ['Reutilizable', 'Sí'],
                        ['Corte recomendado', 'Con disco de acero para no dañar la cuerda'],
                        ['Condiciones de almacenaje', 'Bajo techo, en lugar seco y ventilado, entarimado y en posición horizontal'],
                      ].map(([caracteristica, especificacion], index) => (
                        <tr key={caracteristica} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
                          <td className="p-4 font-medium text-slate-700 align-top whitespace-nowrap">{caracteristica}</td>
                          <td className="p-4 text-slate-600">{especificacion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recomendaciones */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Recomendaciones de uso</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <ul className="space-y-3 text-sm md:text-base text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">•</span>
                      <span>El corte de la barra debe hacerse con disco de acero para no lastimar la cuerda.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">•</span>
                      <span>El aseguramiento debe hacerse con <strong>tuerca mariposa con base</strong>, para garantizar el posicionamiento adecuado de la cimbra.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">•</span>
                      <span>La longitud de la barra roscada para cimbra debe ser suficiente para colocarle una tuerca mariposa con base en cada extremo, dejando <strong>5 cm libres de barra como mínimo</strong>.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Productos complementarios */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Productos complementarios que te harían falta!</h3>
                <p className="text-muted-foreground mb-6">Al comprar la barra roscada para cimbra, estos accesorios son indispensables para su correcta instalación:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Link href="/products/tuerca-mariposa-con-base" className="group bg-card border rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                    <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-3">
                      <Image src="/Image/TUERCA-MARIPOSA-3-IMAGEN-1.jpg" alt="Tuerca Mariposa con Base" fill className="object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Tuerca Mariposa con Base</h4>
                    <p className="text-xs text-slate-500 mt-1">Fijación segura para la barra roscada</p>
                  </Link>
                  <Link href="/products/tubo-para-barra-roscada" className="group bg-card border rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                    <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-3">
                      <Image src="/Image/dfac-cimbra-septiembre/tubo-barra-roscada-dimensiones.jpeg" alt="Tubo para Barra Roscada" fill className="object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Tubo para Barra Roscada</h4>
                    <p className="text-xs text-slate-500 mt-1">Protección durante el colado</p>
                  </Link>
                  <Link href="/products/cono-para-cimbra" className="group bg-card border rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                    <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-3">
                      <Image src="/Image/C0020-2-IMAGEN-1.jpg" alt="Cono para Cimbra" fill className="object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Cono para Cimbra</h4>
                    <p className="text-xs text-slate-500 mt-1">Separación precisa entre cimbras</p>
                  </Link>
                </div>
              </div>

              {/* Ficha tecnica */}
              {fichaTecnicaUrls && (
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Fichas técnicas en PDF</h3>
                    <p className="text-sm md:text-base text-muted-foreground">Descarga las fichas completas con descripción, usos, cualidades y recomendaciones de la barra roscada para cimbra de 5/8&quot;.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {fichaTecnicaUrls.map((url, i) => (
                      <Button
                        key={url}
                        size="lg"
                        asChild
                        className="h-auto py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg shadow-amber-500/40 transition-transform hover:scale-[1.02]"
                      >
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 whitespace-nowrap"
                        >
                          <FileText className="w-6 h-6 shrink-0" />
                          Descargar ficha {fichaTecnicaUrls.length > 1 ? i + 1 : 'técnica'}
                          <Download className="w-5 h-5 shrink-0" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline uppercase tracking-wider">Proyectos que <span className="text-primary">inspiran</span></h2>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <Image src={image.src} alt={image.alt} width={400} height={300} className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-300" data-ai-hint={image.hint} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-white hover:text-primary border-none" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-white hover:text-primary border-none" />
          </Carousel>
        </div>
      </section>
      <RelatedProducts products={relatedProducts} searchParams={searchParams} />
      <section className="py-16 bg-background">
        <ContactSection />
      </section>
    </>
  );
}


// This is now a Server Component
export default async function ProductDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // Fetch all products data on the server
  const jsonDirectory = path.join(process.cwd(), 'public', 'data');
  const fileContents = await fs.readFile(path.join(jsonDirectory, 'products.json'), 'utf8');
  const products: any[] = JSON.parse(fileContents);

  const foundProductData = products.find((p: any) => p.slug === slug);

  let product: Product | null = null;
  let relatedProducts: Product[] = [];

  if (foundProductData) {
    product = {
      id: String(foundProductData.id),
      name: foundProductData.name,
      slug: foundProductData.slug,
      price: (Number(foundProductData.prices?.price) || 0) / 100,
      description: foundProductData.description,
      image: foundProductData.images?.[0]?.src || 'https://placehold.co/400x300.png',
      images: foundProductData.images,
      category: foundProductData.categories?.[0]?.name || 'Accesorios',
      attributes: foundProductData.attributes,
      variations: foundProductData.variations,
    };

    // Find related products (same category, not the same product)
    if (product) {
      relatedProducts = products
        .filter(p => p.categories?.[0]?.name === product?.category && p.slug !== product.slug)
        .slice(0, 3) // Get up to 3 related products
        .map(p => ({
          id: String(p.id),
          name: p.name,
          slug: p.slug,
          price: (Number(p.prices?.price) || 0) / 100,
          description: p.description,
          image: p.images?.[0]?.src || 'https://placehold.co/400x300.png',
          images: p.images,
          category: p.categories?.[0]?.name || 'Accesorios',
        }));
    }
  }

  // Pass the fetched data to the client component
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductDetailsClient product={product!} relatedProducts={relatedProducts} searchParams={resolvedSearchParams} />
    </Suspense>
  );
}

