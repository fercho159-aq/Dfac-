

import Image from 'next/image';
import { Product, ProductImage, Attribute, AttributeTerm } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';
import { ContactSection } from '@/components/contact-section';
import { ProductCard } from '@/components/product-card';
import { Suspense } from 'react';
import { WhatsAppButton } from './WhatsAppButton';

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

