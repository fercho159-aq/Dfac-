

import type { Metadata } from 'next';
import Image from 'next/image';
import { Product, ProductImage, Attribute, AttributeTerm } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, Play } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';

async function getProductBySlug(slug: string) {
  const jsonDirectory = path.join(process.cwd(), 'public', 'data');
  const fileContents = await fs.readFile(path.join(jsonDirectory, 'products.json'), 'utf8');
  const products: any[] = JSON.parse(fileContents);
  return products.find((p: any) => p.slug === slug) || null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Producto no encontrado' };

  const siteUrl = 'https://www.cimbrayaccesoriosdfac.com.mx';

  const cleanDesc = (product.description || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 155);

  const fallbackDesc = `${product.name} — venta y distribución en CDMX con entrega en 24 horas. Cotiza en línea.`;
  const description = cleanDesc || fallbackDesc;

  const ogImage = product.images?.[0]?.src
    ? `${siteUrl}${product.images[0].src}`
    : `${siteUrl}/Image/og-default.png`;

  return {
    title: `${product.name} | DFAC Accesorios para Cimbra`,
    description,
    openGraph: {
      title: `${product.name} | DFAC Accesorios para Cimbra`,
      description,
      url: `${siteUrl}/products/${slug}`,
      siteName: 'DFAC Accesorios para Cimbra',
      images: [{ url: ogImage, width: 800, height: 800, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | DFAC`,
      description,
      images: [ogImage],
    },
  };
}
import { ContactSection } from '@/components/contact-section';
import { ProductCard } from '@/components/product-card';
import { Suspense } from 'react';
import { WhatsAppButton } from './WhatsAppButton';
import { ZoomableImage } from './ImageZoom';
import { CertificacionDIN } from './CertificacionDIN';

const FICHAS_TECNICAS: Record<string, string[]> = {
  'barra-roscada-2': [
    '/archivos/fichas-tecnicas/ficha-tecnica-barra-roscada-descripcion.pdf',
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
  'cono-para-mono-de-cimbra': [
    '/archivos/fichas-tecnicas/ficha-tecnica-cono-para-mono-de-cimbra.pdf',
  ],
  'puntal-metalico-extensible-italiano': [
    '/archivos/fichas-tecnicas/ficha-tecnica-puntal-telescopico.pdf',
  ],
  'cabezal-para-puntal': [
    '/archivos/fichas-tecnicas/ficha-tecnica-cabezal-para-puntal.pdf',
  ],
  'base-estabilizadora': [
    '/archivos/fichas-tecnicas/ficha-tecnica-base-estabilizadora.pdf',
  ],
  'tirante-tipo-mono-con-rondana': [
    '/archivos/fichas-tecnicas/ficha-tecnica-mono-con-rondana-neopreno.pdf',
  ],
  'tirante-tipo-mono': [
    '/archivos/fichas-tecnicas/ficha-tecnica-mono-para-cimbra.pdf',
  ],
  'disco-separador-para-muro-de-concreto': [
    '/archivos/fichas-tecnicas/ficha-tecnica-disco-separador.pdf',
  ],
  'cuna-de-acero': [
    '/archivos/fichas-tecnicas/ficha-tecnica-cuna-de-acero.pdf',
  ],
  'banda-de-pvc-negra-ojillada': [
    '/archivos/fichas-tecnicas/ficha-tecnica-banda-de-pvc.pdf',
  ],
  'capuchon-de-seguridad': [
    '/archivos/fichas-tecnicas/ficha-tecnica-capuchon-de-seguridad.pdf',
  ],
  'tubo-cimbra3-mts-redondo': [
    '/archivos/fichas-tecnicas/ficha-tecnica-tubo-cimbra-sonotubo.pdf',
  ],
  'silleta-h-para-varilla': [
    '/archivos/fichas-tecnicas/ficha-tecnica-silleta-h-para-varilla.pdf',
  ],
  'silleta-h-de-4-puntos': [
    '/archivos/fichas-tecnicas/ficha-tecnica-silleta-h-4-puntos.pdf',
  ],
  'silleta-f': [
    '/archivos/fichas-tecnicas/ficha-tecnica-silleta-f.pdf',
  ],
  'silleta-piramidal': [
    '/archivos/fichas-tecnicas/ficha-tecnica-silleta-piramidal.pdf',
  ],
};

const PRODUCT_VIDEOS: Record<string, { src: string; title: string }[]> = {
  'puntal-metalico-extensible-italiano': [
    { src: '/videos/puntal-1.mp4', title: 'Puntal para cimbra' },
    { src: '/videos/puntal-3.mp4', title: 'Puntal — Demostración' },
    { src: '/videos/puntal-4.mp4', title: 'Puntal — Instalación' },
    { src: '/videos/puntal-5.mp4', title: 'Puntal — Especificaciones' },
  ],
  'tirante-tipo-mono-con-rondana': [
    { src: '/videos/mono-rondana.mp4', title: 'Moño con rondana' },
    { src: '/videos/monos-1.mp4', title: 'Moños para cimbra' },
    { src: '/videos/mono-3.mp4', title: 'Moño — Demostración' },
    { src: '/videos/mono-medidas.mp4', title: 'Moño — Medidas' },
  ],
  'tirante-tipo-mono': [
    { src: '/videos/monos-1.mp4', title: 'Moños para cimbra' },
    { src: '/videos/mono-3.mp4', title: 'Moño — Demostración' },
    { src: '/videos/mono-rondana.mp4', title: 'Moño con rondana' },
    { src: '/videos/mono-medidas.mp4', title: 'Moño — Medidas' },
  ],
  'silleta-h-para-varilla': [
    { src: '/videos/silletas.mp4', title: 'Silletas para construcción' },
    { src: '/videos/silletas-2.mp4', title: 'Silletas — Aplicación' },
    { src: '/videos/silleta-1.mp4', title: 'Silleta individual' },
    { src: '/videos/silleta-2.mp4', title: 'Silleta — Instalación' },
  ],
  'silleta-h-de-4-puntos': [
    { src: '/videos/silletas.mp4', title: 'Silletas para construcción' },
    { src: '/videos/silletas-2.mp4', title: 'Silletas — Aplicación' },
    { src: '/videos/silleta-1.mp4', title: 'Silleta individual' },
  ],
  'silleta-f': [
    { src: '/videos/silletas.mp4', title: 'Silletas para construcción' },
    { src: '/videos/silletas-2.mp4', title: 'Silletas — Aplicación' },
  ],
  'silleta-de-entrepiso': [
    { src: '/videos/silletas.mp4', title: 'Silletas para construcción' },
    { src: '/videos/silletas-2.mp4', title: 'Silletas — Aplicación' },
  ],
  'silleta-de-entrepiso-para-malla': [
    { src: '/videos/silletas.mp4', title: 'Silletas para construcción' },
    { src: '/videos/silletas-2.mp4', title: 'Silletas — Aplicación' },
  ],
  'banda-de-pvc-negra-ojillada': [
    { src: '/videos/banda-pvc.mp4', title: 'Banda de PVC' },
  ],
  'capuchon-de-seguridad': [
    { src: '/videos/capuchones.mp4', title: 'Capuchones de seguridad' },
  ],
  'chicote': [
    { src: '/videos/chicotes.mp4', title: 'Chicotes' },
  ],
  'chicote-para-vibrador-a-gasolina-mpower': [
    { src: '/videos/chicotes.mp4', title: 'Chicotes para vibrador' },
  ],
  'chicote-para-vibrador-a-gasolina-enar': [
    { src: '/videos/chicotes.mp4', title: 'Chicotes para vibrador' },
  ],
  'vibrador-para-concreto': [
    { src: '/videos/vibrador-para-concreto.mp4', title: 'Vibrador para concreto' },
    { src: '/videos/vibradores-electrico-y-gasolina.mp4', title: 'Vibradores eléctrico y a gasolina' },
  ],
  'vibrador-de-concreto-electrico': [
    { src: '/videos/vibrador-para-concreto.mp4', title: 'Vibrador para concreto' },
    { src: '/videos/vibradores-electrico-y-gasolina.mp4', title: 'Vibradores eléctrico y a gasolina' },
  ],
  'vibrador-para-concreto-a-gasolina-mpower': [
    { src: '/videos/vibrador-para-concreto.mp4', title: 'Vibrador para concreto' },
    { src: '/videos/vibradores-electrico-y-gasolina.mp4', title: 'Vibradores eléctrico y a gasolina' },
  ],
  'vibrador-para-concreto-a-gasolina-enar': [
    { src: '/videos/vibrador-para-concreto.mp4', title: 'Vibrador para concreto' },
    { src: '/videos/vibradores-electrico-y-gasolina.mp4', title: 'Vibradores eléctrico y a gasolina' },
  ],
  'cabezal-para-puntal': [
    { src: '/videos/puntal-1.mp4', title: 'Puntal para cimbra' },
    { src: '/videos/puntal-3.mp4', title: 'Puntal — Demostración' },
  ],
  'base-estabilizadora': [
    { src: '/videos/puntal-1.mp4', title: 'Puntal para cimbra' },
    { src: '/videos/puntal-3.mp4', title: 'Puntal — Demostración' },
  ],
  'malacate': [
    { src: '/videos/malacate.mp4', title: 'Malacate' },
  ],
  'flota-de-magnesio': [
    { src: '/videos/flota-de-magnesio.mp4', title: 'Flota de magnesio' },
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
  const productVideos = PRODUCT_VIDEOS[product.slug];


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
                        <ZoomableImage src={img.src || 'https://placehold.co/600x600.png'} alt={product.name} />
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

              {/* Accesorios para puntales - debajo de imagen */}
              {product.slug === 'puntal-metalico-extensible-italiano' && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Accesorios para puntales</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { href: "/products/base-estabilizadora", img: "/Image/base-estabilizadora-tripie.webp", name: "Base Estabilizadora Trípie", desc: "Base estabilizadora para pie derecho (trípie)" },
                      { href: "https://www.cimbrayaccesoriosdfac.com.mx/viga-h20", img: "/Image/Viga-H20/viga-h20-fondo-blanco.png", name: "Viga H20", desc: "Viga de madera laminada para sistemas de cimbra" },
                      { href: "/products/cabezal-para-puntal", img: "/Image/cabezal-para-puntal/cabezal-producto.jpeg", name: "Cabezal para Puntal", desc: "Cabezal de soporte para vigas y sistemas de apuntalamiento" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                        <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2 flex items-center justify-center bg-slate-50">
                          <Image src={item.img} alt={item.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                        <p className="text-xs text-slate-500 mt-1 hidden sm:block">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Puntales - debajo de imagen de base estabilizadora */}
              {product.slug === 'base-estabilizadora' && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Complementa con puntales</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { href: "/products/puntal-metalico-extensible-italiano", img: "/Image/puntal-italiano-fondo-blanco.png", name: "Puntal Metálico Extensible", desc: "Puntal italiano con certificación europea" },
                      { href: "https://www.cimbrayaccesoriosdfac.com.mx/viga-h20", img: "/Image/Viga-H20/viga-h20-fondo-blanco.png", name: "Viga H20", desc: "Viga de madera laminada para sistemas de cimbra" },
                      { href: "/products/cabezal-para-puntal", img: "/Image/cabezal-para-puntal/cabezal-producto.jpeg", name: "Cabezal para Puntal", desc: "Cabezal de soporte para vigas y sistemas de apuntalamiento" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                        <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2 flex items-center justify-center bg-slate-50">
                          <Image src={item.img} alt={item.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                        <p className="text-xs text-slate-500 mt-1 hidden sm:block">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Productos complementarios para cabezal */}
              {product.slug === 'cabezal-para-puntal' && (
                <>
                  <p className="text-xs text-slate-500 text-center italic mt-2">* La compra del cabezal no incluye la viga, puntal ni base estabilizadora. Consulta nuestros productos complementarios.</p>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Productos complementarios que te harían falta!</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { href: "https://www.cimbrayaccesoriosdfac.com.mx/viga-h20", img: "/Image/Viga-H20/viga-h20-fondo-blanco.png", name: "Viga H20", desc: "Viga de madera laminada para sistemas de cimbra" },
                        { href: "/products/puntal-metalico-extensible-italiano", img: "/Image/puntal-italiano-fondo-blanco.png", name: "Puntal Metálico Extensible", desc: "Puntal italiano con certificación europea" },
                        { href: "/products/base-estabilizadora", img: "/Image/base-estabilizadora-tripie.webp", name: "Base Estabilizadora Trípie", desc: "Base estabilizadora para pie derecho (trípie)" },
                      ].map((item) => (
                        <Link key={item.href} href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                          <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2 flex items-center justify-center bg-slate-50">
                            <Image src={item.img} alt={item.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform" />
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                          <p className="text-xs text-slate-500 mt-1 hidden sm:block">{item.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Productos complementarios para moño con rondana */}
              {product.slug === 'tirante-tipo-mono-con-rondana' && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Productos complementarios que te harían falta!</h3>
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-3">
                      {[
                        { href: "/products/cuna-de-acero", img: "/Image/cuna-portada.jpeg", name: "Cuñas de acero", desc: "Para fijar y asegurar el moño en la cimbra" },
                        { href: "/products/disco-separador-para-muro-de-concreto", img: "/Image/disco-portada.jpeg", name: "Disco separador", desc: "Mantiene la separación entre caras de la cimbra" },
                        { href: "/products/cono-para-cimbra", img: "/Image/cono-portada-new.png", name: "Conos para moño", desc: "Acabado uniforme y anti-adherente al concreto" },
                      ].map((item) => (
                        <CarouselItem key={item.href} className="pl-3 basis-1/2">
                          <Link href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                            <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2">
                              <Image src={item.img} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                  </Carousel>
                </div>
              )}

              {/* Productos complementarios para moño normal */}
              {product.slug === 'tirante-tipo-mono' && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Productos complementarios que te harían falta!</h3>
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-3">
                      {[
                        { href: "/products/cuna-de-acero", img: "/Image/cuna-portada.jpeg", name: "Cuñas de acero", desc: "Para fijar y asegurar el moño en la cimbra" },
                        { href: "/products/disco-separador-para-muro-de-concreto", img: "/Image/disco-portada.jpeg", name: "Disco separador", desc: "Mantiene la separación entre caras de la cimbra" },
                        { href: "/products/cono-para-cimbra", img: "/Image/cono-portada-new.png", name: "Conos para moño", desc: "Acabado uniforme y anti-adherente al concreto" },
                      ].map((item) => (
                        <CarouselItem key={item.href} className="pl-3 basis-1/2">
                          <Link href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                            <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2">
                              <Image src={item.img} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                  </Carousel>
                </div>
              )}

              {/* Productos complementarios - carrusel debajo de imágenes */}
              {(product.slug === 'barra-roscada-2' || product.slug === 'tuerca-mariposa-con-base' || product.slug === 'tubo-para-barra-roscada') && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Productos complementarios que te harían falta!</h3>
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-3">
                      {[
                        { href: "/products/barra-roscada-2", img: "/Image/barra-portada.jpeg", name: "Barra Roscada para Cimbra", desc: "Barra de acero cold rolled de 5/8\"" },
                        { href: "/products/tuerca-mariposa-con-base", img: "/Image/tuerca-portada.jpeg", name: "Tuerca Mariposa con Base", desc: "Fijación segura para la barra roscada" },
                        { href: "/products/tubo-para-barra-roscada", img: "/Image/dfac-cimbra-septiembre/tubo-barra-roscada-dimensiones.jpeg", name: "Tubo para Barra Roscada", desc: "Protección durante el colado" },
                        { href: "/products/cono-para-cimbra", img: "/Image/cono-portada-new.png", name: "Cono para Cimbra", desc: "Acabado uniforme en muros" },
                      ].filter((item) => item.href !== `/products/${product.slug}`).map((item) => (
                        <CarouselItem key={item.href} className="pl-3 basis-1/2">
                          <Link href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                            <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2">
                              <Image src={item.img} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                  </Carousel>
                </div>
              )}

              {/* Productos complementarios para disco separador */}
              {product.slug === 'disco-separador-para-muro-de-concreto' && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Productos complementarios que te harían falta!</h3>
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-3">
                      {[
                        { href: "/products/tirante-tipo-mono", img: "/Image/mono-portada-new.jpeg", name: "Moños para cimbra", desc: "Tirante para sujeción de cimbra" },
                        { href: "/products/tirante-tipo-mono-con-rondana", img: "/Image/neopreno-portada.jpeg", name: "Moño con neopreno para cimbra", desc: "Mayor sellado e impermeabilidad" },
                        { href: "/products/cuna-de-acero", img: "/Image/cuna-portada.jpeg", name: "Cuñas de acero", desc: "Fijación firme del moño en la cimbra" },
                        { href: "/products/banda-de-pvc-negra-ojillada", img: "/Image/banda-portada.jpeg", name: "Banda de PVC", desc: "Impermeabilidad en juntas frías" },
                      ].map((item) => (
                        <CarouselItem key={item.href} className="pl-3 basis-1/2">
                          <Link href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                            <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2">
                              <Image src={item.img} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                  </Carousel>
                </div>
              )}

              {/* Productos complementarios para cuñas de acero */}
              {product.slug === 'cuna-de-acero' && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Productos complementarios que te harían falta!</h3>
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-3">
                      {[
                        { href: "/products/tirante-tipo-mono", img: "/Image/mono-portada-new.jpeg", name: "Moños para cimbra", desc: "Tirante para sujeción de cimbra" },
                        { href: "/products/tirante-tipo-mono-con-rondana", img: "/Image/neopreno-portada.jpeg", name: "Moño con neopreno para cimbra", desc: "Mayor sellado e impermeabilidad" },
                        { href: "/products/cono-para-cimbra", img: "/Image/cono-portada-new.png", name: "Conos para moño", desc: "Acabado uniforme y anti-adherente" },
                      ].map((item) => (
                        <CarouselItem key={item.href} className="pl-3 basis-1/2">
                          <Link href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                            <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2">
                              <Image src={item.img} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                  </Carousel>
                </div>
              )}

              {/* Productos complementarios para cono */}
              {product.slug === 'cono-para-cimbra' && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Productos complementarios que te harían falta!</h3>
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-3">
                      {[
                        { href: "/products/tubo-para-barra-roscada", img: "/Image/dfac-cimbra-septiembre/tubo-barra-roscada-dimensiones.jpeg", name: "Tubo para Barra Roscada", desc: "Protección durante el colado" },
                        { href: "/products/barra-roscada-2", img: "/Image/barra-portada.jpeg", name: "Barra Roscada", desc: "Barra de acero cold rolled de 5/8\"" },
                        { href: "/products/tuerca-mariposa-con-base", img: "/Image/tuerca-portada.jpeg", name: "Tuerca Mariposa con Base", desc: "Fijación segura para la barra roscada" },
                        { href: "/products/tirante-tipo-mono", img: "/Image/mono-portada-new.jpeg", name: "Moños para cimbra", desc: "Tirante para sujeción de cimbra" },
                        { href: "/products/tirante-tipo-mono-con-rondana", img: "/Image/neopreno-portada.jpeg", name: "Moño con neopreno para cimbra", desc: "Mayor sellado e impermeabilidad" },
                        { href: "/products/cuna-de-acero", img: "/Image/cuna-portada.jpeg", name: "Cuñas de acero", desc: "Fijación firme del moño en la cimbra" },
                      ].map((item) => (
                        <CarouselItem key={item.href} className="pl-3 basis-1/2">
                          <Link href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                            <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2">
                              <Image src={item.img} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                  </Carousel>
                </div>
              )}

              {/* Productos complementarios para cono para moño */}
              {product.slug === 'cono-para-mono-de-cimbra' && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Productos complementarios que te harían falta!</h3>
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-3">
                      {[
                        { href: "/products/tirante-tipo-mono", img: "/Image/mono-portada-new.jpeg", name: "Moños para cimbra", desc: "Tirante para sujeción de cimbra" },
                        { href: "/products/tirante-tipo-mono-con-rondana", img: "/Image/neopreno-portada.jpeg", name: "Moño con neopreno", desc: "Mayor sellado e impermeabilidad" },
                        { href: "/products/cuna-de-acero", img: "/Image/cuna-portada.jpeg", name: "Cuñas de acero", desc: "Fijación firme del moño en la cimbra" },
                        { href: "/products/barra-roscada-2", img: "/Image/barra-portada.jpeg", name: "Barra Roscada", desc: "Barra de acero cold rolled de 5/8\"" },
                        { href: "/products/tuerca-mariposa-con-base", img: "/Image/tuerca-portada.jpeg", name: "Tuerca Mariposa con Base", desc: "Fijación segura para la barra roscada" },
                      ].map((item) => (
                        <CarouselItem key={item.href} className="pl-3 basis-1/2">
                          <Link href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                            <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2">
                              <Image src={item.img} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                  </Carousel>
                </div>
              )}

              {/* Productos complementarios para banda de PVC */}
              {product.slug === 'banda-de-pvc-negra-ojillada' && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Productos complementarios que te harían falta!</h3>
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-3">
                      {[
                        { href: "/products/tirante-tipo-mono-con-rondana", img: "/Image/neopreno-portada.jpeg", name: "Moño con neopreno para cimbra", desc: "Mayor sellado e impermeabilidad" },
                        { href: "/products/disco-separador-para-muro-de-concreto", img: "/Image/disco-portada.jpeg", name: "Disco separador", desc: "Mantiene la separación entre caras de la cimbra" },
                        { href: "/products/cimbrabau", img: "/Image/cimbrabau-portada.png", name: "Desmoldante de concreto", desc: "Desmoldante para cimbra CIMBRABAU" },
                      ].map((item) => (
                        <CarouselItem key={item.href} className="pl-3 basis-1/2">
                          <Link href={item.href} className="group block bg-card border rounded-xl p-3 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                            <div className="aspect-square relative w-full overflow-hidden rounded-lg mb-2">
                              <Image src={item.img} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8" />
                  </Carousel>
                </div>
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
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Es un sello retenedor de agua color negro, elaborado a base de cloruro de polivinilo en forma de cinta flexible con bulbo central y laterales estriados. Diseñado para garantizar la impermeabilidad en juntas frías de construcción.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4">
                    <p className="text-sm md:text-base text-slate-800 font-bold">Se vende por rollo de 25 metros lineales.</p>
                  </div>
                </div>
              ) : product.slug === 'cuna-de-acero' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Acero de alta resistencia · 1,350 kg de carga · Reutilizables</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Las cuñas para moño de cimbra están fabricadas en lámina de acero de alta resistencia. Están diseñadas para mantener la presión necesaria durante el colado y garantizar la separación adecuada entre las placas de cimbra.
                  </p>
                  <p className="text-sm md:text-base text-slate-800 mb-6">
                    Proporcionan una sujeción firme sin necesidad de clavos, lo que permite realizar un trabajo más rápido, seguro y limpio. Además, son reutilizables, fáciles de instalar y compatibles con todos nuestros moños para cimbra.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mb-3">Características y beneficios</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span><strong>Fijación firme y segura:</strong> Mantienen el moño perfectamente en su lugar, evitando que la cimbra se deforme o se abra durante el colado.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span><strong>Acabado de alta calidad:</strong> Permiten obtener columnas, muros y trabes rectos, con acabados lisos y precisos.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span><strong>Instalación rápida y sin clavos:</strong> Se colocan fácilmente con un golpe de martillo, sin necesidad de herramientas adicionales ni clavos.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span><strong>Alta resistencia:</strong> Fabricadas en acero resistente, soportan caídas, cargas pesadas y condiciones de trabajo rudo en obra.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span><strong>Reutilizables:</strong> Pueden recuperarse y utilizarse en múltiples colados sin perder su funcionalidad ni su forma.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span><strong>Versátiles:</strong> Compatibles con sistemas de cimbra de madera, metálica y encofrados tradicionales.</span></li>
                  </ul>

                  <h4 className="text-base font-bold text-slate-800 mb-3">Especificaciones técnicas</h4>
                  <div className="overflow-hidden rounded-xl border shadow-sm mb-6">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b bg-slate-50"><td className="p-3 font-semibold text-slate-700 w-1/3">Material</td><td className="p-3 text-slate-800">Placa de acero de alta resistencia</td></tr>
                        <tr className="border-b"><td className="p-3 font-semibold text-slate-700">Troquelado</td><td className="p-3 text-slate-800">En frío</td></tr>
                        <tr className="border-b bg-slate-50"><td className="p-3 font-semibold text-slate-700">Grosor</td><td className="p-3 text-slate-800">Estándar de 3/16&quot;</td></tr>
                        <tr className="border-b"><td className="p-3 font-semibold text-slate-700">Capacidad de acuñe</td><td className="p-3 text-slate-800">25 mm</td></tr>
                        <tr className="border-b bg-slate-50"><td className="p-3 font-semibold text-slate-700">Medidas (LxAxA)</td><td className="p-3 text-slate-800">7 cm x 2 cm x 15 cm</td></tr>
                        <tr className="border-b"><td className="p-3 font-semibold text-slate-700">Peso aproximado</td><td className="p-3 text-slate-800">400 gr</td></tr>
                        <tr className="border-b bg-slate-50"><td className="p-3 font-semibold text-slate-700">Piezas por atado</td><td className="p-3 text-slate-800">25 pz</td></tr>
                        <tr className="border-b"><td className="p-3 font-semibold text-slate-700">Capacidad de carga</td><td className="p-3 text-slate-800">1,350 kg (3,000 Lb)</td></tr>
                        <tr className="bg-slate-50"><td className="p-3 font-semibold text-slate-700">Factor de seguridad</td><td className="p-3 text-slate-800">800 kg</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="text-base font-bold text-slate-800 mb-3">¿Cómo se colocan?</h4>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Las cuñas se instalan a presión. Para ajustarlas, solo se necesita un golpe ligero de martillo. No requieren clavos ni fijaciones adicionales.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mb-3">¿Cómo se retiran?</h4>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Una vez fraguado el concreto, se puede romper o doblar el moño para retirar el tramo interno y recuperar las cuñas, lo que permite reutilizarlas en futuros colados.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4">
                    <p className="text-sm md:text-base text-slate-800"><strong>NOTA:</strong> Se requieren 2 cuñas por cada moño o tirante.</p>
                  </div>
                </div>
              ) : product.slug === 'disco-separador-para-muro-de-concreto' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Separador lateral, fuerte y ligero. Diseñado para mantener el acero al centro y lograr recubrimientos de concreto uniformes en ambos lados. Ideal para acabados aparentes.
                  </p>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Resistencia de Carga: 100 Kg. Muros de concreto con acero de refuerzo al centro. Distanciador vertical, cuenta con un clip interno que aseguran la óptima sujeción del acero. Garantizan recubrimientos exactos, y proporcionan acabados estéticos sin marcas aparentes.
                  </p>
                </div>
              ) : product.slug === 'cono-para-cimbra' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    El cono para cimbra es un accesorio diseñado para garantizar un acabado uniforme y de alta calidad en muros y columnas de concreto. Fabricado en polipropileno de alta resistencia, permite mantener el espesor adecuado de la cimbra y proteger la barra durante el proceso de colado.
                  </p>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Se coloca entre la cimbra y la tuerca mariposa con base, cubriendo el extremo del tubo para barra roscada. Gracias a su forma cónica, facilita el desmolde y deja una cavidad limpia y uniforme en la superficie del concreto.
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

                  <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Piezas por empaque</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Peso pieza (grs)</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Peso empaque (kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 font-bold text-slate-800">1,500</td>
                          <td className="px-4 py-2 font-bold text-slate-800">8.1</td>
                          <td className="px-4 py-2 font-bold text-slate-800">12.3</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'cono-para-mono-de-cimbra' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Los conos para moño son accesorios que complementan determinados sistemas de sujeción empleados durante el armado y colado de elementos de concreto. Se colocan únicamente de acuerdo con la configuración del tirante y las instrucciones del fabricante. La geometría cónica puede ayudar a definir el espacio alrededor del tirante y, cuando el diseño lo contempla, facilitar el resane o sellado posterior.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Material</p>
                      <p className="text-base font-bold text-slate-800">Poliestireno rígido</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Configuración</p>
                      <p className="text-base font-bold text-slate-800">Pieza cónica</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Uso principal</p>
                      <p className="text-base font-bold text-slate-800">Tirantes/moños</p>
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-800 mb-3">Aplicaciones</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Cimbra para muros de concreto colado en sitio</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Sistemas de cimbra para trabes y columnas, cuando el sistema sea compatible</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Obras que utilizan moños o tirantes con dimensiones de acoplamiento correspondientes</span>
                    </li>
                  </ul>
                </div>
              ) : product.slug === 'silleta-h-para-varilla' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Gran capacidad de carga y mayor estabilidad, ya que sobre un eje tiene dos puntos de soporte para el acero. Muy poca superficie de contacto, funciona para acabados aparentes.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">●</span>
                      <span>Fabricados con 100% polipropileno o polietileno y pigmento</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">●</span>
                      <span>Fabricados bajo proceso de inyección de plástico</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">●</span>
                      <span>Producto 100% impermeable e inerte, no reacciona con el concreto</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">●</span>
                      <span>Se utiliza en todo tipo de losas, trabes y contra trabes, prefabricados, tilt-ups y post-tensados (se puede aplicar para piso)</span>
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Carga máxima</p>
                      <p className="text-base font-bold text-slate-800">275 Kg</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Calibre de acero</p>
                      <p className="text-base font-bold text-slate-800">Varilla hasta 1 1/2&quot;</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Material</p>
                      <p className="text-base font-bold text-slate-800">Polipropileno / Polietileno</p>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-800 mt-6 mb-3">Especificaciones</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Clave</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Recubrimiento de Concreto (cm)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Piezas por Empaque</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Pieza (grs)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Empaque (Kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH100</td><td className="px-3 py-2 text-slate-800">2.5</td><td className="px-3 py-2 text-slate-800">1000</td><td className="px-3 py-2 text-slate-800">11.5</td><td className="px-3 py-2 text-slate-800">11.7</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH150</td><td className="px-3 py-2 text-slate-800">4.0</td><td className="px-3 py-2 text-slate-800">400</td><td className="px-3 py-2 text-slate-800">21.0</td><td className="px-3 py-2 text-slate-800">8.6</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH200</td><td className="px-3 py-2 text-slate-800">5.0</td><td className="px-3 py-2 text-slate-800">300</td><td className="px-3 py-2 text-slate-800">28.0</td><td className="px-3 py-2 text-slate-800">8.6</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH250</td><td className="px-3 py-2 text-slate-800">6.5</td><td className="px-3 py-2 text-slate-800">250</td><td className="px-3 py-2 text-slate-800">42.0</td><td className="px-3 py-2 text-slate-800">10.7</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH300</td><td className="px-3 py-2 text-slate-800">7.5</td><td className="px-3 py-2 text-slate-800">225</td><td className="px-3 py-2 text-slate-800">46.0</td><td className="px-3 py-2 text-slate-800">10.5</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH350</td><td className="px-3 py-2 text-slate-800">9.0</td><td className="px-3 py-2 text-slate-800">200</td><td className="px-3 py-2 text-slate-800">50.0</td><td className="px-3 py-2 text-slate-800">10.2</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH400</td><td className="px-3 py-2 text-slate-800">10.0</td><td className="px-3 py-2 text-slate-800">150</td><td className="px-3 py-2 text-slate-800">65.0</td><td className="px-3 py-2 text-slate-800">9.9</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH450</td><td className="px-3 py-2 text-slate-800">11.5</td><td className="px-3 py-2 text-slate-800">90</td><td className="px-3 py-2 text-slate-800">67.0</td><td className="px-3 py-2 text-slate-800">6.2</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH500</td><td className="px-3 py-2 text-slate-800">12.5</td><td className="px-3 py-2 text-slate-800">70</td><td className="px-3 py-2 text-slate-800">84.0</td><td className="px-3 py-2 text-slate-800">6.0</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH550</td><td className="px-3 py-2 text-slate-800">14.0</td><td className="px-3 py-2 text-slate-800">70</td><td className="px-3 py-2 text-slate-800">86.0</td><td className="px-3 py-2 text-slate-800">6.2</td></tr>
                        <tr><td className="px-3 py-2 text-slate-800 font-semibold">SH600</td><td className="px-3 py-2 text-slate-800">15.0</td><td className="px-3 py-2 text-slate-800">70</td><td className="px-3 py-2 text-slate-800">103.0</td><td className="px-3 py-2 text-slate-800">7.4</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'silleta-h-de-4-puntos' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Gran diseño y estabilidad, sobre un eje tiene dos puntos de soporte para el acero. Excelente rendimiento en el concreto y agregados gruesos. Superficie de contacto mínima, ideal para acabados aparentes.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Carga máxima</p>
                      <p className="text-base font-bold text-slate-800">275 Kg</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Calibre de acero</p>
                      <p className="text-base font-bold text-slate-800">Varilla hasta 1 1/2&quot;</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Aplicaciones</p>
                      <p className="text-base font-bold text-slate-800">Losas, trabes, prefabricados</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-slate-700">
                    Se utiliza en todo tipo de losas, trabes y contratrabes, prefabricados, tilt-ups y post-tensados.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mt-6 mb-3">Especificaciones</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Clave</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Recubrimiento de Concreto (cm)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Piezas por Empaque</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Pieza (grs)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Empaque (Kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH150</td><td className="px-3 py-2 text-slate-800">4.0</td><td className="px-3 py-2 text-slate-800">400</td><td className="px-3 py-2 text-slate-800">19.0</td><td className="px-3 py-2 text-slate-800">7.8</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH200</td><td className="px-3 py-2 text-slate-800">5.0</td><td className="px-3 py-2 text-slate-800">300</td><td className="px-3 py-2 text-slate-800">24.0</td><td className="px-3 py-2 text-slate-800">7.4</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH250</td><td className="px-3 py-2 text-slate-800">6.5</td><td className="px-3 py-2 text-slate-800">250</td><td className="px-3 py-2 text-slate-800">29.0</td><td className="px-3 py-2 text-slate-800">7.4</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH300</td><td className="px-3 py-2 text-slate-800">7.5</td><td className="px-3 py-2 text-slate-800">225</td><td className="px-3 py-2 text-slate-800">43.0</td><td className="px-3 py-2 text-slate-800">9.9</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH350</td><td className="px-3 py-2 text-slate-800">9.0</td><td className="px-3 py-2 text-slate-800">200</td><td className="px-3 py-2 text-slate-800">47.0</td><td className="px-3 py-2 text-slate-800">9.6</td></tr>
                        <tr><td className="px-3 py-2 text-slate-800 font-semibold">SH400</td><td className="px-3 py-2 text-slate-800">10.0</td><td className="px-3 py-2 text-slate-800">150</td><td className="px-3 py-2 text-slate-800">51.5</td><td className="px-3 py-2 text-slate-800">7.9</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'silleta-f' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Separador multifuncional, fuerte y económico. Su amplia base le proporciona gran estabilidad y apoyo. Cuenta con dos diferentes alturas de recubrimiento (2.0 cm y 2.5 cm) en una misma pieza, lo que lo convierte en una solución práctica y versátil.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Carga máxima</p>
                      <p className="text-base font-bold text-slate-800">250 Kg</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Calibre de acero</p>
                      <p className="text-base font-bold text-slate-800">Varilla hasta 3/4&quot;</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Recubrimiento</p>
                      <p className="text-base font-bold text-slate-800">2.0 y 2.5 cm</p>
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-800 mb-3">Aplicaciones</h4>
                  <p className="text-sm md:text-base text-slate-700 mb-4">
                    Todo tipo de losas, colados en sitio, trabes y contratrabes. Cuando ya se tiene listo el armado, se colocan las silletas bajo la varilla inferior o la superior, dependiendo del recubrimiento de concreto deseado, cuidando que el acero quede bien soportado.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Diseño multifuncional con dos alturas en una sola pieza</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Amplia base para mayor estabilidad en superficies firmes o poco compactadas</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Ideal para losas, trabes, contratrabes, prefabricados, tilt-ups y post-tensados</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Evita desplazamientos durante el colado</span></li>
                  </ul>

                  <h4 className="text-base font-bold text-slate-800 mt-6 mb-3">Especificaciones</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Clave</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Calibre de Acero</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Piezas por Empaque</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Pieza (Grs)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Empaque (Kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="px-3 py-2 text-slate-800 font-semibold">SF100</td><td className="px-3 py-2 text-slate-800">2 Y 2.5</td><td className="px-3 py-2 text-slate-800">1500</td><td className="px-3 py-2 text-slate-800">5.5</td><td className="px-3 py-2 text-slate-800">8.5</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'tubo-cimbra3-mts-redondo' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    El sonotubo para cimbra es un molde cilíndrico fabricado con capas de cartón laminado, diseñado para facilitar el colado de columnas circulares de concreto u hormigón armado. Es una alternativa práctica y eficiente a los sistemas tradicionales de cimbra de madera o metal.
                  </p>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded-r-lg">
                    <p className="text-sm md:text-base text-amber-900 font-bold">
                      Todos nuestros sonotubos disponibles miden 3 metros de alto.
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Disponible en diferentes diámetros y espesores, el sonotubo se adapta a los requerimientos de cada proyecto, ofreciendo una solución funcional para obtener columnas con un acabado uniforme y una geometría definida.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Material</p>
                      <p className="text-base font-bold text-slate-800">Cartón laminado</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Largo</p>
                      <p className="text-base font-bold text-slate-800">3 metros</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Diámetros</p>
                      <p className="text-base font-bold text-slate-800">15 a 100 cm</p>
                    </div>
                  </div>

                  <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Largo (Mts)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Diámetro (Cms)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Grosor (Mm)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso (Kg)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">15</td><td className="px-3 py-2 text-slate-800">3.8</td><td className="px-3 py-2 text-slate-800">2.66</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">20</td><td className="px-3 py-2 text-slate-800">3.8</td><td className="px-3 py-2 text-slate-800">3.58</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">25</td><td className="px-3 py-2 text-slate-800">4.4</td><td className="px-3 py-2 text-slate-800">5.60</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">30</td><td className="px-3 py-2 text-slate-800">4.4</td><td className="px-3 py-2 text-slate-800">6.68</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">35</td><td className="px-3 py-2 text-slate-800">5</td><td className="px-3 py-2 text-slate-800">9.35</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">40</td><td className="px-3 py-2 text-slate-800">5</td><td className="px-3 py-2 text-slate-800">10.51</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">45</td><td className="px-3 py-2 text-slate-800">5</td><td className="px-3 py-2 text-slate-800">15.71</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">50</td><td className="px-3 py-2 text-slate-800">5.7</td><td className="px-3 py-2 text-slate-800">18.47</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">60</td><td className="px-3 py-2 text-slate-800">6.3</td><td className="px-3 py-2 text-slate-800">26.37</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">70</td><td className="px-3 py-2 text-slate-800">8.2</td><td className="px-3 py-2 text-slate-800">36.96</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">80</td><td className="px-3 py-2 text-slate-800">8.2</td><td className="px-3 py-2 text-slate-800">46.99</td></tr>
                        <tr><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">100</td><td className="px-3 py-2 text-slate-800">11</td><td className="px-3 py-2 text-slate-800">58.63</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'capuchon-de-seguridad' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Los capuchones para varilla son accesorios de seguridad diseñados para cubrir las terminaciones laterales de las varillas de acero expuestas, ayudando a reducir el riesgo de golpes, raspones y lesiones ocasionadas por sus salientes en zonas de tránsito de trabajadores.
                  </p>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Fabricados en polietileno con protección contra los rayos UV, cuentan con un diseño interior que favorece una fijación firme al acero y un color de alta visibilidad que permite identificar fácilmente las varillas protegidas.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Material</p>
                      <p className="text-base font-bold text-slate-800">Polietileno</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Protección</p>
                      <p className="text-base font-bold text-slate-800">UV</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Temperatura</p>
                      <p className="text-base font-bold text-slate-800">-5°C a 55°C</p>
                    </div>
                  </div>

                  <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Clave</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Calibre de acero</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Pzas por empaque</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Peso pieza (grs)</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Peso empaque (kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-2 font-bold text-slate-800">RD075</td>
                          <td className="px-4 py-2 text-slate-800">3/8&quot; a 3/4&quot;</td>
                          <td className="px-4 py-2 text-slate-800">1000</td>
                          <td className="px-4 py-2 text-slate-800">13.2</td>
                          <td className="px-4 py-2 text-slate-800">13.200</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2 font-bold text-slate-800">RD100</td>
                          <td className="px-4 py-2 text-slate-800">3/8&quot; a 1&quot;</td>
                          <td className="px-4 py-2 text-slate-800">500</td>
                          <td className="px-4 py-2 text-slate-800">27.6</td>
                          <td className="px-4 py-2 text-slate-800">13.800</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-bold text-slate-800">RD150</td>
                          <td className="px-4 py-2 text-slate-800">1&quot; a 1 1/2&quot;</td>
                          <td className="px-4 py-2 text-slate-800">300</td>
                          <td className="px-4 py-2 text-slate-800">34.0</td>
                          <td className="px-4 py-2 text-slate-800">10.200</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'tirante-tipo-mono' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Acero de alto carbón · 1,350 kg de carga · 2,200 kg de resistencia</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Se emplea para la sujeción de cimbra de muros y trabes en que se desee obtener un acabado perfecto, con espesores estrictos, específicamente donde los gruesos totales de cimbrado permanecen constantes.
                  </p>
                  <p className="text-sm md:text-base text-slate-800 mb-6">
                    <strong>Usos:</strong> cada separador de cimbra requiere dos cuñas para completar la sujeción. Nuestro estándar es para gruesos de cimbrado de 23 cm.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mb-3">Ventajas</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Espesores controlados y uniformes.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>No existen fugas de lechada.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>La marca es uniforme, cónica y puede ser resanada fácilmente o integrada a un patrón arquitectónico.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Permiten un mayor reúso de las formas.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Facilitan la obtención de acabados con mayor calidad.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Proveen un uso más eficiente de la mano de obra.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Brinda un acabado arquitectónico más estético.</span></li>
                  </ul>

                  <h4 className="text-base font-bold text-slate-800 mb-3">Especificaciones técnicas</h4>
                  <div className="overflow-hidden rounded-xl border shadow-sm mb-4">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b bg-slate-50">
                          <td className="p-3 font-semibold text-slate-700 w-1/3">Material</td>
                          <td className="p-3 text-slate-800">Fabricados con acero de alto carbón 5.8 mm de diámetro</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-semibold text-slate-700">Tipo de muesca</td>
                          <td className="p-3 text-slate-800">Para quiebre inmediato a 25 mm del extremo angosto del cono</td>
                        </tr>
                        <tr className="border-b bg-slate-50">
                          <td className="p-3 font-semibold text-slate-700">Material del cono</td>
                          <td className="p-3 text-slate-800">Poliestireno rígido (paredes pulidas)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-semibold text-slate-700">Capacidad de carga</td>
                          <td className="p-3 text-slate-800">Recomendada de 1,350 kg. Se recomienda utilizar 8 piezas por hoja de triplay como mínimo</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="p-3 font-semibold text-slate-700">Resistencia máxima</td>
                          <td className="p-3 text-slate-800">2,200 kg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4">
                    <p className="text-sm md:text-base text-slate-800"><strong>NOTA:</strong> SOMOS FABRICANTES. Fabricamos medidas específicas.</p>
                  </div>
                </div>
              ) : product.slug === 'tubo-para-barra-roscada' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Diámetro 22 mm · Para barra de 5/8&quot; · 2 m y 3 m</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Está diseñado para proteger la barra roscada durante el colado de muros y columnas, evitando que el concreto se adhiera a la barra y permitiendo su recuperación para usos posteriores.
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
                    El cono para cimbra es un accesorio diseñado para garantizar un acabado uniforme y de alta calidad en muros y columnas de concreto. Fabricado en polipropileno de alta resistencia, permite mantener el espesor adecuado de la cimbra y proteger la barra durante el proceso de colado.
                  </p>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Se coloca entre la cimbra y la tuerca mariposa con base, cubriendo el extremo del tubo para barra roscada. Gracias a su forma cónica, facilita el desmolde y deja una cavidad limpia y uniforme en la superficie del concreto.
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

                  <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Piezas por empaque</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Peso pieza (grs)</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Peso empaque (kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 font-bold text-slate-800">1,500</td>
                          <td className="px-4 py-2 font-bold text-slate-800">8.1</td>
                          <td className="px-4 py-2 font-bold text-slate-800">12.3</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'cono-para-mono-de-cimbra' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Poliestireno rígido · Complemento de tirantes/moños · Pieza cónica</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Los conos para moño son accesorios auxiliares de geometría cónica utilizados con sistemas compatibles de moños o tirantes para cimbra. Su diseño permite alojar el tirante o accesorio correspondiente y, cuando el diseño lo contempla, facilitar el resane o sellado posterior al descimbrado.
                  </p>
                </div>
              ) : product.slug === 'silleta-h-para-varilla' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Polipropileno / Polietileno · Carga máx. 275 Kg · Varilla hasta 1 1/2&quot;</span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-slate-800 mt-4 mb-3">Características de la Silleta H</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">●</span>
                      <span><b>Doble punto de soporte:</b> sobre un eje tiene dos puntos de apoyo para el acero, brindando mayor estabilidad.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">●</span>
                      <span><b>Acabados aparentes:</b> muy poca superficie de contacto, ideal para acabados visibles de concreto.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">●</span>
                      <span><b>100% impermeable e inerte:</b> no reacciona con el concreto, garantizando la integridad de la estructura.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mt-1">●</span>
                      <span><b>Inyección de plástico:</b> fabricado bajo proceso de inyección con polipropileno o polietileno y pigmento.</span>
                    </li>
                  </ul>

                  <h4 className="text-base font-bold text-slate-800 mt-6 mb-3">Especificaciones</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Clave</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Recubrimiento de Concreto (cm)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Piezas por Empaque</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Pieza (grs)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Empaque (Kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH100</td><td className="px-3 py-2 text-slate-800">2.5</td><td className="px-3 py-2 text-slate-800">1000</td><td className="px-3 py-2 text-slate-800">11.5</td><td className="px-3 py-2 text-slate-800">11.7</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH150</td><td className="px-3 py-2 text-slate-800">4.0</td><td className="px-3 py-2 text-slate-800">400</td><td className="px-3 py-2 text-slate-800">21.0</td><td className="px-3 py-2 text-slate-800">8.6</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH200</td><td className="px-3 py-2 text-slate-800">5.0</td><td className="px-3 py-2 text-slate-800">300</td><td className="px-3 py-2 text-slate-800">28.0</td><td className="px-3 py-2 text-slate-800">8.6</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH250</td><td className="px-3 py-2 text-slate-800">6.5</td><td className="px-3 py-2 text-slate-800">250</td><td className="px-3 py-2 text-slate-800">42.0</td><td className="px-3 py-2 text-slate-800">10.7</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH300</td><td className="px-3 py-2 text-slate-800">7.5</td><td className="px-3 py-2 text-slate-800">225</td><td className="px-3 py-2 text-slate-800">46.0</td><td className="px-3 py-2 text-slate-800">10.5</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH350</td><td className="px-3 py-2 text-slate-800">9.0</td><td className="px-3 py-2 text-slate-800">200</td><td className="px-3 py-2 text-slate-800">50.0</td><td className="px-3 py-2 text-slate-800">10.2</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH400</td><td className="px-3 py-2 text-slate-800">10.0</td><td className="px-3 py-2 text-slate-800">150</td><td className="px-3 py-2 text-slate-800">65.0</td><td className="px-3 py-2 text-slate-800">9.9</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH450</td><td className="px-3 py-2 text-slate-800">11.5</td><td className="px-3 py-2 text-slate-800">90</td><td className="px-3 py-2 text-slate-800">67.0</td><td className="px-3 py-2 text-slate-800">6.2</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH500</td><td className="px-3 py-2 text-slate-800">12.5</td><td className="px-3 py-2 text-slate-800">70</td><td className="px-3 py-2 text-slate-800">84.0</td><td className="px-3 py-2 text-slate-800">6.0</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH550</td><td className="px-3 py-2 text-slate-800">14.0</td><td className="px-3 py-2 text-slate-800">70</td><td className="px-3 py-2 text-slate-800">86.0</td><td className="px-3 py-2 text-slate-800">6.2</td></tr>
                        <tr><td className="px-3 py-2 text-slate-800 font-semibold">SH600</td><td className="px-3 py-2 text-slate-800">15.0</td><td className="px-3 py-2 text-slate-800">70</td><td className="px-3 py-2 text-slate-800">103.0</td><td className="px-3 py-2 text-slate-800">7.4</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'silleta-h-de-4-puntos' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Carga máx. 275 Kg · Varilla hasta 1 1/2&quot; · 4 puntos de apoyo</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Gran diseño y estabilidad, sobre un eje tiene dos puntos de soporte para el acero. Excelente rendimiento en el concreto y agregados gruesos. Superficie de contacto mínima, ideal para acabados aparentes. Se utiliza en todo tipo de losas, trabes y contratrabes, prefabricados, tilt-ups y post-tensados.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mt-6 mb-3">Especificaciones</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Clave</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Recubrimiento de Concreto (cm)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Piezas por Empaque</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Pieza (grs)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Empaque (Kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH150</td><td className="px-3 py-2 text-slate-800">4.0</td><td className="px-3 py-2 text-slate-800">400</td><td className="px-3 py-2 text-slate-800">19.0</td><td className="px-3 py-2 text-slate-800">7.8</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH200</td><td className="px-3 py-2 text-slate-800">5.0</td><td className="px-3 py-2 text-slate-800">300</td><td className="px-3 py-2 text-slate-800">24.0</td><td className="px-3 py-2 text-slate-800">7.4</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH250</td><td className="px-3 py-2 text-slate-800">6.5</td><td className="px-3 py-2 text-slate-800">250</td><td className="px-3 py-2 text-slate-800">29.0</td><td className="px-3 py-2 text-slate-800">7.4</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SH300</td><td className="px-3 py-2 text-slate-800">7.5</td><td className="px-3 py-2 text-slate-800">225</td><td className="px-3 py-2 text-slate-800">43.0</td><td className="px-3 py-2 text-slate-800">9.9</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SH350</td><td className="px-3 py-2 text-slate-800">9.0</td><td className="px-3 py-2 text-slate-800">200</td><td className="px-3 py-2 text-slate-800">47.0</td><td className="px-3 py-2 text-slate-800">9.6</td></tr>
                        <tr><td className="px-3 py-2 text-slate-800 font-semibold">SH400</td><td className="px-3 py-2 text-slate-800">10.0</td><td className="px-3 py-2 text-slate-800">150</td><td className="px-3 py-2 text-slate-800">51.5</td><td className="px-3 py-2 text-slate-800">7.9</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'silleta-f' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Carga máx. 250 Kg · Varilla hasta 3/4&quot; · Recubrimiento 2.0 y 2.5 cm</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Es un separador multifuncional diseñado para brindar estabilidad y precisión en el armado de estructuras de concreto. Gracias a su amplia base, ofrece un excelente apoyo en superficies firmes o poco compactadas, evitando desplazamientos durante el colado. Cuenta con dos alturas de recubrimiento (2.0 cm y 2.5 cm) en una misma pieza, lo que lo convierte en una solución práctica y versátil para todo tipo de losas, colados en sitio, trabes y contratrabes.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mt-6 mb-3">Especificaciones</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Clave</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Calibre de Acero</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Piezas por Empaque</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Pieza (Grs)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Empaque (Kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="px-3 py-2 text-slate-800 font-semibold">SF100</td><td className="px-3 py-2 text-slate-800">2 Y 2.5</td><td className="px-3 py-2 text-slate-800">1500</td><td className="px-3 py-2 text-slate-800">5.5</td><td className="px-3 py-2 text-slate-800">8.5</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'tubo-cimbra3-mts-redondo' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Cartón laminado · 3 metros de alto · 15 a 100 cm de diámetro</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    El sonotubo para cimbra es un molde cilíndrico fabricado con capas de cartón laminado, diseñado para facilitar el colado de columnas circulares de concreto u hormigón armado. Es una alternativa práctica y eficiente a los sistemas tradicionales de cimbra de madera o metal, ya que simplifica la instalación, optimiza los tiempos de trabajo y contribuye a reducir los costos de construcción.
                  </p>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded-r-lg">
                    <p className="text-sm md:text-base text-amber-900 font-bold">
                      Todos nuestros sonotubos disponibles miden 3 metros de alto.
                    </p>
                  </div>

                  <h4 className="text-base font-bold text-slate-800 mb-3">Ventajas del sonotubo</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Ahorro en costos: reduce gastos de fabricación, instalación y retiro de cimbras tradicionales.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Mayor eficiencia en obra: agiliza la preparación de columnas circulares.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Fácil instalación: su diseño facilita la colocación y preparación del molde.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Acabado uniforme: superficies circulares regulares sin trabajos correctivos.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Diseño ligero y práctico: fácil manipulación y traslado en obra.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Variedad de medidas: diámetros de 15 a 100 cm.</span></li>
                  </ul>

                  <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Largo (Mts)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Diámetro (Cms)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Grosor (Mm)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso (Kg)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">15</td><td className="px-3 py-2 text-slate-800">3.8</td><td className="px-3 py-2 text-slate-800">2.66</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">20</td><td className="px-3 py-2 text-slate-800">3.8</td><td className="px-3 py-2 text-slate-800">3.58</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">25</td><td className="px-3 py-2 text-slate-800">4.4</td><td className="px-3 py-2 text-slate-800">5.60</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">30</td><td className="px-3 py-2 text-slate-800">4.4</td><td className="px-3 py-2 text-slate-800">6.68</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">35</td><td className="px-3 py-2 text-slate-800">5</td><td className="px-3 py-2 text-slate-800">9.35</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">40</td><td className="px-3 py-2 text-slate-800">5</td><td className="px-3 py-2 text-slate-800">10.51</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">45</td><td className="px-3 py-2 text-slate-800">5</td><td className="px-3 py-2 text-slate-800">15.71</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">50</td><td className="px-3 py-2 text-slate-800">5.7</td><td className="px-3 py-2 text-slate-800">18.47</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">60</td><td className="px-3 py-2 text-slate-800">6.3</td><td className="px-3 py-2 text-slate-800">26.37</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">70</td><td className="px-3 py-2 text-slate-800">8.2</td><td className="px-3 py-2 text-slate-800">36.96</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">80</td><td className="px-3 py-2 text-slate-800">8.2</td><td className="px-3 py-2 text-slate-800">46.99</td></tr>
                        <tr><td className="px-3 py-2 text-slate-800">3</td><td className="px-3 py-2 text-slate-800">100</td><td className="px-3 py-2 text-slate-800">11</td><td className="px-3 py-2 text-slate-800">58.63</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'capuchon-de-seguridad' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Polietileno · Protección UV · -5°C a 55°C</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Los capuchones para varilla son accesorios de seguridad diseñados para cubrir las terminaciones laterales de las varillas de acero expuestas, ayudando a reducir el riesgo de golpes, raspones y lesiones ocasionadas por sus salientes en zonas de tránsito de trabajadores.
                  </p>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Fabricados en polietileno con protección contra los rayos UV, cuentan con un diseño interior que favorece una fijación firme al acero y un color de alta visibilidad que permite identificar fácilmente las varillas protegidas. Son una solución práctica y durable para reforzar las medidas de seguridad en obras de construcción.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mb-3">Características y beneficios</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Mayor seguridad en obra: ayudan a reducir el riesgo de golpes y raspones.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Alta visibilidad: su color llamativo facilita la identificación de las varillas protegidas.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Fijación firme: su diseño con venas internas favorece el ajuste al acero.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Material resistente: fabricados en polietileno con protección UV.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Resistencia a condiciones climáticas: de -5°C a 55°C.</span></li>
                    <li className="flex items-start gap-2 text-sm md:text-base text-slate-800"><span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span><span>Reutilizables siempre que conserven su forma y ajuste adecuado.</span></li>
                  </ul>

                  <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Clave</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Calibre de acero</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Pzas por empaque</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Peso pieza (grs)</th>
                          <th className="px-4 py-2 text-left font-semibold text-slate-700">Peso empaque (kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-2 font-bold text-slate-800">RD075</td>
                          <td className="px-4 py-2 text-slate-800">3/8&quot; a 3/4&quot;</td>
                          <td className="px-4 py-2 text-slate-800">1000</td>
                          <td className="px-4 py-2 text-slate-800">13.2</td>
                          <td className="px-4 py-2 text-slate-800">13.200</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2 font-bold text-slate-800">RD100</td>
                          <td className="px-4 py-2 text-slate-800">3/8&quot; a 1&quot;</td>
                          <td className="px-4 py-2 text-slate-800">500</td>
                          <td className="px-4 py-2 text-slate-800">27.6</td>
                          <td className="px-4 py-2 text-slate-800">13.800</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-bold text-slate-800">RD150</td>
                          <td className="px-4 py-2 text-slate-800">1&quot; a 1 1/2&quot;</td>
                          <td className="px-4 py-2 text-slate-800">300</td>
                          <td className="px-4 py-2 text-slate-800">34.0</td>
                          <td className="px-4 py-2 text-slate-800">10.200</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4 mt-4">
                    <p className="text-sm md:text-base text-slate-800"><strong>NOTA:</strong> No están diseñados para protección contra impactos severos ni para las salientes verticales de las varillas expuestas. Su uso no sustituye otras medidas de seguridad en obra.</p>
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
              ) : product.slug === 'base-estabilizadora' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-6">
                    La base estabilizadora para pie derecho (tripié) es un accesorio diseñado para proporcionar mayor estabilidad y soporte a los pies derechos (puntales) utilizados en sistemas de cimbra. Gracias a su diseño, facilita el armado de estructuras de soporte y contribuye a reducir movimientos o desplazamientos del pie derecho, permitiendo trabajar con una estructura más estable.
                  </p>
                  <h4 className="text-base font-bold text-slate-800 mb-3">Ventajas</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span>
                      <p className="text-sm text-slate-700"><strong>Mayor estabilidad:</strong> ayuda a mantener firme el pie derecho durante la instalación.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span>
                      <p className="text-sm text-slate-700"><strong>Fácil colocación:</strong> su diseño permite integrarla de manera práctica al sistema de soporte.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span>
                      <p className="text-sm text-slate-700"><strong>Mejor organización del sistema de cimbra:</strong> contribuye a mantener los elementos correctamente posicionados.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span>
                      <p className="text-sm text-slate-700"><strong>Reutilizable:</strong> puede utilizarse en diferentes proyectos, dependiendo de las condiciones y especificaciones del sistema.</p>
                    </div>
                  </div>
                </div>
              ) : product.slug === 'puntal-metalico-extensible-italiano' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Acero S235JRH · Certificación Europea · Anti-Cizallamiento</span>
                  </div>
                  <CertificacionDIN />
                  <p className="text-sm md:text-base text-slate-800 mb-6">
                    Puntal metálico extensible italiano fabricado con acero de alta resistencia S235JRH, con certificación europea UNI EN 729-2: 1996. Diseñado con sistema anti-cizallamiento y placas de distribución reforzadas para una óptima distribución de la carga.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mb-3">Medidas Disponibles:</h4>
                  <div className="overflow-hidden rounded-xl border shadow-sm mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="text-left p-3">Modelo</th>
                          <th className="text-left p-3">Altura Máx.</th>
                          <th className="text-left p-3">Carga Máx.</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Ligero 1.80–3.00</td>
                          <td className="p-3">300 cm</td>
                          <td className="p-3">2,638.98 kg</td>
                        </tr>
                        <tr className="border-b bg-slate-50">
                          <td className="p-3 font-medium">Ligero 2.20–4.00</td>
                          <td className="p-3">400 cm</td>
                          <td className="p-3">2,312.68 kg</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">B40 2.31–4.00 (Reforzado)</td>
                          <td className="p-3">400 cm</td>
                          <td className="p-3">3,059.15 kg</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="p-3 font-medium">B50 2.80–5.00 (Extra Fuerte)</td>
                          <td className="p-3">500 cm</td>
                          <td className="p-3">2,518 kg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : product.slug === 'torre-iluminacion-lux-s11' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">6 LED de 80W c/u · 3,600 m² · Altura máx. 4.5 m</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Torre de iluminación compacta y potente, equipada con 6 lámparas LED de 80W cada una. Diseñada para iluminar grandes áreas de trabajo en obras de construcción, mantenimiento vial y eventos, con una cobertura de hasta 3,600 m² y una altura máxima de 4.5 metros.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Lámparas</p>
                      <p className="text-base font-bold text-slate-800">6 LED × 80W</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Cobertura</p>
                      <p className="text-base font-bold text-slate-800">3,600 m²</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Altura máx.</p>
                      <p className="text-base font-bold text-slate-800">4.5 m</p>
                    </div>
                  </div>
                </div>
              ) : product.slug === 'torre-iluminacion-luxm11' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">4 LED 240W · 176,000 lm · Generador diésel 5.5 kVA</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Torre de iluminación de máxima potencia con generador diésel integrado de 5.5 kVA. Equipada con 4 lámparas LED de 240W que producen 176,000 lúmenes, cubriendo hasta 9,300 m² con una altura de mástil de 8.5 metros. Remolcable y con rotación de 360°.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Lámparas</p>
                      <p className="text-base font-bold text-slate-800">4 LED × 240W</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Lúmenes</p>
                      <p className="text-base font-bold text-slate-800">176,000 lm</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Cobertura</p>
                      <p className="text-base font-bold text-slate-800">9,300 m²</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Altura máx.</p>
                      <p className="text-base font-bold text-slate-800">8.5 m</p>
                    </div>
                  </div>
                </div>
              ) : product.slug === 'torre-iluminacion-bone' ? (
                <div className="product-description font-sans">
                  <div className="bg-green-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">100% Baterías de Litio · Cero Emisiones · Plug &amp; Play</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Torre de iluminación 100% eléctrica con baterías de litio LiFePO4. Equipada con 4 lámparas LED de 160W que producen 88,000 lúmenes, cubriendo hasta 2,650 m² con una altura de mástil de 7 metros. Cero emisiones, silenciosa y con sistema Plug &amp; Play.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Lámparas</p>
                      <p className="text-base font-bold text-slate-800">4 LED × 160W</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Lúmenes</p>
                      <p className="text-base font-bold text-slate-800">88,000 lm</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Cobertura</p>
                      <p className="text-base font-bold text-slate-800">2,650 m²</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Autonomía</p>
                      <p className="text-base font-bold text-slate-800">36 horas</p>
                    </div>
                  </div>
                </div>
              ) : product.slug === 'cabezal-para-puntal' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Acero galvanizado · 4 vías · Compatible con vigas H20</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    El cabezal para puntal es un accesorio fabricado en acero galvanizado, diseñado para facilitar el apoyo, posicionamiento y estabilización de vigas de madera H20 sobre puntales metálicos telescópicos. Su diseño permite colocar una o dos vigas, facilitando diferentes configuraciones de apoyo de acuerdo con las necesidades del sistema de cimbrado.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Material</p>
                      <p className="text-base font-bold text-slate-800">Acero Galvanizado</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Configuración</p>
                      <p className="text-base font-bold text-slate-800">4 Vías</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Compatible</p>
                      <p className="text-base font-bold text-slate-800">Vigas H20</p>
                    </div>
                  </div>
                </div>
              ) : product.slug === 'tirante-tipo-mono-con-rondana' ? (
                <div className="product-description font-sans">
                  <div className="bg-blue-600 inline-block px-4 py-2 mb-4 text-center rounded">
                    <span className="text-sm md:text-base text-white font-medium">Acero F11 · Rondana de neopreno · 2,200 kg de resistencia</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Moños (tirantes) para cimbra con rondana de neopreno con la más confiable calidad en fabricación. Los moños están elaborados con acero F11 de alto carbón, con una rondana plástica (rondana de neopreno) que sirve como <strong>sellador en muros expuestos a la humedad como albercas, cisternas, tanques, etc.</strong>
                  </p>
                  <p className="text-sm md:text-base text-slate-800 mb-6">
                    Cuentan con una resistencia de 2,200 kg/m², además de conos de poliestireno anti-adherente al concreto y un par de muescas de quiebre inmediato para eliminar el material sobrante al momento de retirar la cimbra. Su cavidad permite su fácil extracción después de haber retirado las formas.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mb-3">Especificaciones técnicas</h4>
                  <div className="overflow-hidden rounded-xl border shadow-sm mb-4">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b bg-slate-50">
                          <td className="p-3 font-semibold text-slate-700 w-1/3">Material</td>
                          <td className="p-3 text-slate-800">Fabricados con acero de alto carbón 5.8 mm de diámetro</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-semibold text-slate-700">Tipo de muesca</td>
                          <td className="p-3 text-slate-800">Para quiebre inmediato a 25 mm del extremo angosto del cono</td>
                        </tr>
                        <tr className="border-b bg-slate-50">
                          <td className="p-3 font-semibold text-slate-700">Material del cono</td>
                          <td className="p-3 text-slate-800">Poliestireno rígido (paredes pulidas)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-semibold text-slate-700">Capacidad de carga</td>
                          <td className="p-3 text-slate-800">Recomendada de 1,350 kg. Se recomienda utilizar 8 piezas por hoja de triplay como mínimo</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="p-3 font-semibold text-slate-700">Resistencia máxima</td>
                          <td className="p-3 text-slate-800">2,200 kg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border-2 border-blue-600 bg-gradient-to-br from-blue-600 to-blue-700 p-4 md:p-5 mb-4 shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base md:text-lg font-bold text-white mb-1">Disponibilidad y Tiempos de Entrega</h4>
                        <p className="text-sm md:text-base text-blue-50 leading-relaxed">
                          ¿Necesitas medidas específicas? No esperes semanas. Contamos con un <strong className="text-white">servicio de fabricación acelerada</strong> con entregas a partir de las <strong className="text-white">24 a 72 horas</strong>. Para medidas estándar (10 a 40 cm), garantizamos entrega inmediata según existencias.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4">
                    <p className="text-sm md:text-base text-slate-800"><strong>NOTA:</strong> SOMOS FABRICANTES. Fabricamos medidas específicas.</p>
                  </div>
                </div>
              ) : product.slug === 'silleta-piramidal' ? (
                <div className="product-description font-sans">
                  <p className="text-sm md:text-base text-slate-800 mb-4">
                    Separador fuerte y económico, con amplia base que le proporciona gran estabilidad. Sistema de sujeción fuerte y versátil.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Carga máxima</p>
                      <p className="text-base font-bold text-slate-800">250 Kg</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Calibre de acero</p>
                      <p className="text-base font-bold text-slate-800">Varilla y malla hasta 1/2&quot;</p>
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-800 mb-3">Aplicaciones</h4>
                  <p className="text-sm md:text-base text-slate-700 mb-4">
                    Para calzar armados y las contratrabes en todo tipo de losas de cimentación. Es importante que las silletas estén distribuidas correctamente máximo 75 cm de distancia traslapándolas.
                  </p>

                  <h4 className="text-base font-bold text-slate-800 mt-6 mb-3">Especificaciones</h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Clave</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Recubrimiento de Concreto (cm)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Piezas por Empaque</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Pieza (grs)</th>
                          <th className="px-3 py-2 text-left font-semibold text-slate-700">Peso Empaque (Kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SP125</td><td className="px-3 py-2 text-slate-800">3.0</td><td className="px-3 py-2 text-slate-800">1000</td><td className="px-3 py-2 text-slate-800">12.0</td><td className="px-3 py-2 text-slate-800">12.2</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SP200</td><td className="px-3 py-2 text-slate-800">5.0</td><td className="px-3 py-2 text-slate-800">600</td><td className="px-3 py-2 text-slate-800">16.5</td><td className="px-3 py-2 text-slate-800">8.4</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SP250</td><td className="px-3 py-2 text-slate-800">6.5</td><td className="px-3 py-2 text-slate-800">400</td><td className="px-3 py-2 text-slate-800">20.0</td><td className="px-3 py-2 text-slate-800">8.2</td></tr>
                        <tr className="border-b bg-slate-50"><td className="px-3 py-2 text-slate-800 font-semibold">SP300</td><td className="px-3 py-2 text-slate-800">7.5</td><td className="px-3 py-2 text-slate-800">350</td><td className="px-3 py-2 text-slate-800">25.0</td><td className="px-3 py-2 text-slate-800">8.9</td></tr>
                        <tr className="border-b"><td className="px-3 py-2 text-slate-800 font-semibold">SP350</td><td className="px-3 py-2 text-slate-800">9.0</td><td className="px-3 py-2 text-slate-800">300</td><td className="px-3 py-2 text-slate-800">28.0</td><td className="px-3 py-2 text-slate-800">8.6</td></tr>
                        <tr><td className="px-3 py-2 text-slate-800 font-semibold">SP450</td><td className="px-3 py-2 text-slate-800">11.0</td><td className="px-3 py-2 text-slate-800">200</td><td className="px-3 py-2 text-slate-800">43.0</td><td className="px-3 py-2 text-slate-800">8.8</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="prose prose-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
              )}

              {medidaAttribute && medidaAttribute.terms.length > 0 && product.slug !== 'puntal-metalico-extensible-italiano' && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Medidas Disponibles:</h3>
                  <div className="flex flex-wrap gap-2">
                    {medidaAttribute.terms.map((term: AttributeTerm) => (
                      <Badge key={term.id} variant="outline">{term.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {product.slug === 'disco-separador-para-muro-de-concreto' && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Especificaciones por modelo</h3>
                  <div className="overflow-hidden rounded-xl border shadow-sm">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="p-3 text-left">Clave</th>
                          <th className="p-3 text-left">Muros de Concreto con Acero al Centro</th>
                          <th className="p-3 text-left">Calibre de Acero</th>
                          <th className="p-3 text-left">Empaque</th>
                          <th className="p-3 text-left">(grs)</th>
                          <th className="p-3 text-left">Empaque (kgs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="p-3 font-bold">DS125</td><td className="p-3">8 cm</td><td className="p-3">1/8&quot; hasta ½&quot;</td><td className="p-3">700</td><td className="p-3">18.0</td><td className="p-3">12.8</td></tr>
                        <tr className="border-b bg-slate-50"><td className="p-3 font-bold">DS150</td><td className="p-3">10 cm</td><td className="p-3">¼&quot; hasta ½&quot;</td><td className="p-3">500</td><td className="p-3">19.0</td><td className="p-3">9.7</td></tr>
                        <tr className="border-b"><td className="p-3 font-bold">DS175</td><td className="p-3">10 cm</td><td className="p-3">1/8&quot; hasta 5/16&quot;</td><td className="p-3">450</td><td className="p-3">16.0</td><td className="p-3">7.4</td></tr>
                        <tr className="border-b bg-slate-50"><td className="p-3 font-bold">DS200</td><td className="p-3">12 cm</td><td className="p-3">¼&quot; hasta 5/8&quot;</td><td className="p-3">250</td><td className="p-3">24.0</td><td className="p-3">6.2</td></tr>
                        <tr><td className="p-3 font-bold">DS250</td><td className="p-3">15 cm</td><td className="p-3">3/8&quot; hasta 1&quot;</td><td className="p-3">150</td><td className="p-3">57.0</td><td className="p-3">8.7</td></tr>
                      </tbody>
                    </table>
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

          {/* Tubo para cimbra (Sonotubo) - Detailed info sections below the grid */}
          {product.slug === 'tubo-cimbra3-mts-redondo' && (
            <div className="mt-16 space-y-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">¿Cómo está fabricado el sonotubo?</h3>
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
                  <p className="text-sm md:text-base text-slate-700">
                    El sonotubo se fabrica mediante el enrollado en espiral de múltiples capas de papel y cartón, unidas con adhesivos especiales mediante un proceso de laminado que proporciona rigidez y resistencia. Su estructura está diseñada para soportar las condiciones de uso durante el colado del concreto.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Aplicaciones</h3>
                <p className="text-muted-foreground mb-6">El sonotubo se utiliza principalmente en la construcción de columnas circulares de concreto:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Obras residenciales', 'Edificaciones comerciales', 'Columnas arquitectónicas', 'Infraestructura'].map((uso) => (
                    <div key={uso} className="bg-card border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-slate-700">{uso}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Información técnica</h3>
                <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                  <table className="w-full text-sm">
                    <tbody className="divide-y">
                      <tr className="bg-slate-50"><td className="px-4 py-3 font-medium text-slate-700 w-1/2">Material</td><td className="px-4 py-3 text-slate-600">Capas de papel y cartón laminadas</td></tr>
                      <tr><td className="px-4 py-3 font-medium text-slate-700">Proceso de fabricación</td><td className="px-4 py-3 text-slate-600">Enrollado en espiral y unión mediante adhesivos</td></tr>
                      <tr className="bg-slate-50"><td className="px-4 py-3 font-medium text-slate-700">Función principal</td><td className="px-4 py-3 text-slate-600">Molde para colado de columnas circulares</td></tr>
                      <tr><td className="px-4 py-3 font-medium text-slate-700">Presentación</td><td className="px-4 py-3 text-slate-600">Pieza individual</td></tr>
                      <tr className="bg-slate-50"><td className="px-4 py-3 font-medium text-slate-700">Medidas disponibles</td><td className="px-4 py-3 text-slate-600">Diámetros de 15 a 100 cm, todos de 3 metros de alto</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Capuchones para Varilla - Detailed info sections below the grid */}
          {product.slug === 'capuchon-de-seguridad' && (
            <div className="mt-16 space-y-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Aplicaciones</h3>
                <p className="text-sm md:text-base text-slate-800 mb-4">
                  Ideales para cubrir las terminaciones laterales de las varillas expuestas en zonas de tránsito de trabajadores, contribuyendo a mantener espacios de trabajo más seguros y ordenados.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Precauciones de uso</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                    <p className="text-sm text-slate-700">No están diseñados para brindar protección contra impactos severos ni para detener lesiones por empalamiento.</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                    <p className="text-sm text-slate-700">No deben utilizarse como protección en las salientes verticales de las varillas expuestas.</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 md:col-span-2">
                    <p className="text-sm text-slate-700">Su uso no sustituye otras medidas de seguridad, señalización ni los sistemas de protección requeridos en obra.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Especificaciones técnicas</h3>
                <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                  <table className="w-full text-sm">
                    <tbody className="divide-y">
                      <tr className="bg-slate-50"><td className="px-4 py-3 font-medium text-slate-700 w-1/2">Material</td><td className="px-4 py-3 text-slate-600">Polietileno con protección UV</td></tr>
                      <tr><td className="px-4 py-3 font-medium text-slate-700">Rango de temperatura</td><td className="px-4 py-3 text-slate-600">-5°C a 55°C</td></tr>
                      <tr className="bg-slate-50"><td className="px-4 py-3 font-medium text-slate-700">Reutilizable</td><td className="px-4 py-3 text-slate-600">Sí, siempre que conserven su forma y ajuste</td></tr>
                      <tr><td className="px-4 py-3 font-medium text-slate-700">Color</td><td className="px-4 py-3 text-slate-600">Alta visibilidad (naranja)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Preguntas frecuentes</h3>
                <div className="space-y-4">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h4 className="text-base font-bold text-slate-800 mb-2">¿Los capuchones para varilla son reutilizables?</h4>
                    <p className="text-sm text-slate-700">Sí, pueden reutilizarse siempre que conserven su forma, mantengan un ajuste adecuado y no presenten daños visibles. Se recomienda inspeccionarlos antes de cada uso.</p>
                  </div>
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h4 className="text-base font-bold text-slate-800 mb-2">¿Cuántas piezas se necesitan por obra?</h4>
                    <p className="text-sm text-slate-700">La cantidad depende del número de varillas expuestas que requieran protección. Se recomienda considerar una pieza por cada terminación lateral que se deba cubrir.</p>
                  </div>
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h4 className="text-base font-bold text-slate-800 mb-2">¿De qué material están fabricados?</h4>
                    <p className="text-sm text-slate-700">Están fabricados en polietileno con protección UV, diseñado para ofrecer resistencia y durabilidad en condiciones habituales de obra.</p>
                  </div>
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <h4 className="text-base font-bold text-slate-800 mb-2">¿En qué rango de temperatura pueden utilizarse?</h4>
                    <p className="text-sm text-slate-700">Su rango de resistencia térmica indicado es de -5°C a 55°C.</p>
                  </div>
                </div>
              </div>

              {fichaTecnicaUrls && (
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Ficha técnica en PDF</h3>
                    <p className="text-sm md:text-base text-muted-foreground">Descarga la ficha completa con especificaciones de los capuchones para varilla.</p>
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
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">¿Dónde se utiliza?</h3>
                <p className="text-sm md:text-base text-slate-800 mb-4">
                  Principalmente en sistemas de cimbra para elementos de concreto, como muros, trabes y columnas. El cono debe corresponder al tipo de tirante, a sus dimensiones y al procedimiento de montaje del sistema.
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

              {/* Ficha tecnica */}
              {fichaTecnicaUrls && (
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Ficha técnica en PDF</h3>
                    <p className="text-sm md:text-base text-muted-foreground">Descarga la ficha completa con descripción, usos, cualidades y recomendaciones de la barra roscada para cimbra de 5/8&quot;.</p>
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

          {/* Puntal - Detailed info sections below the grid */}
          {product.slug === 'puntal-metalico-extensible-italiano' && (
            <div className="mt-16 space-y-12">
              {/* Características del Producto */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Características del Producto</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Acero de Alta Resistencia</h4>
                    <p className="text-sm text-slate-700">Fabricado con acero S235JRH para máxima durabilidad.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Normas de Producción</h4>
                    <p className="text-sm text-slate-700">Cumple con la estricta norma europea UNI EN 729-2: 1996.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Sistema Anti-Cizallamiento</h4>
                    <p className="text-sm text-slate-700">Diseño de mano segura para prevenir accidentes durante el ajuste.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Placas de Distribución</h4>
                    <p className="text-sm text-slate-700">Bases planas y reforzadas para una óptima distribución de la carga.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Torre LUX S11 - Detailed info */}
          {product.slug === 'torre-iluminacion-lux-s11' && (
            <div className="mt-16 space-y-12">
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
                        ['Tipo de iluminación', '6 lámparas LED de 80W cada una'],
                        ['Cobertura', '3,600 m²'],
                        ['Altura máxima del mástil', '4.5 metros'],
                        ['Disponibilidad', 'Bajo pedido'],
                      ].map(([caracteristica, especificacion], index) => (
                        <tr key={caracteristica} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
                          <td className="p-4 font-medium text-slate-700">{caracteristica}</td>
                          <td className="p-4 text-slate-600">{especificacion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Aplicaciones</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Obras de construcción', 'Mantenimiento vial', 'Eventos', 'Iluminación industrial'].map((uso) => (
                    <div key={uso} className="bg-card border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-slate-700">{uso}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Torre LUXM11 - Detailed info */}
          {product.slug === 'torre-iluminacion-luxm11' && (
            <div className="mt-16 space-y-12">
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
                        ['Tipo de iluminación', '4 lámparas LED de 240W'],
                        ['Flujo luminoso', '176,000 lúmenes'],
                        ['Cobertura', '9,300 m²'],
                        ['Altura máxima del mástil', '8.5 metros'],
                        ['Generador', 'Diésel 5.5 kVA'],
                        ['Autonomía', '80 horas'],
                        ['Consumo', '0.35 L/h'],
                        ['Nivel de ruido', '65 dB'],
                        ['Rotación', '360°'],
                        ['Protección', 'IP65'],
                        ['Remolcable', 'Sí'],
                        ['Origen', 'Italia'],
                      ].map(([caracteristica, especificacion], index) => (
                        <tr key={caracteristica} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
                          <td className="p-4 font-medium text-slate-700">{caracteristica}</td>
                          <td className="p-4 text-slate-600">{especificacion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Ventajas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Generador diésel integrado</h4>
                    <p className="text-sm text-slate-700">Motor diésel de 5.5 kVA con autonomía de 80 horas y consumo ultra bajo de 0.35 L/h.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Remolcable</h4>
                    <p className="text-sm text-slate-700">Diseñada para transportarse fácilmente a cualquier sitio de trabajo.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Rotación 360°</h4>
                    <p className="text-sm text-slate-700">Las lámparas giran 360° para dirigir la luz exactamente donde se necesita.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-blue-800 mb-2">Protección IP65</h4>
                    <p className="text-sm text-slate-700">Resistente al polvo y a chorros de agua, ideal para condiciones de obra.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Aplicaciones</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Obras de construcción', 'Mantenimiento vial', 'Minería', 'Eventos y rescate'].map((uso) => (
                    <div key={uso} className="bg-card border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-slate-700">{uso}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Torre B.ONE - Detailed info */}
          {product.slug === 'torre-iluminacion-bone' && (
            <div className="mt-16 space-y-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Especificaciones Técnicas</h3>
                <div className="overflow-hidden rounded-xl border shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="text-left p-4">Característica</th>
                        <th className="text-left p-4">Especificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Tipo de iluminación', '4 lámparas LED de 160W'],
                        ['Flujo luminoso', '88,000 lúmenes'],
                        ['Cobertura', '2,650 m²'],
                        ['Altura máxima del mástil', '7 metros'],
                        ['Fuente de energía', 'Baterías de litio LiFePO4'],
                        ['Autonomía', '36 horas'],
                        ['Emisiones', 'Cero emisiones'],
                        ['Sistema', 'Plug & Play'],
                        ['Protección', 'IP65'],
                        ['Origen', 'Italia'],
                      ].map(([caracteristica, especificacion], index) => (
                        <tr key={caracteristica} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
                          <td className="p-4 font-medium text-slate-700">{caracteristica}</td>
                          <td className="p-4 text-slate-600">{especificacion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Ventajas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-green-800 mb-2">Cero emisiones</h4>
                    <p className="text-sm text-slate-700">Funciona 100% con baterías de litio LiFePO4. Sin combustibles fósiles, sin emisiones contaminantes.</p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-green-800 mb-2">Silenciosa</h4>
                    <p className="text-sm text-slate-700">Sin motor de combustión, opera de forma silenciosa. Ideal para zonas urbanas y eventos.</p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-green-800 mb-2">Plug &amp; Play</h4>
                    <p className="text-sm text-slate-700">Lista para usar. Se conecta y enciende sin configuración adicional.</p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                    <h4 className="text-base font-bold text-green-800 mb-2">36 horas de autonomía</h4>
                    <p className="text-sm text-slate-700">Baterías LiFePO4 de larga duración para jornadas completas sin recarga.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Aplicaciones</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Obras de construcción', 'Zonas urbanas', 'Eventos', 'Áreas protegidas'].map((uso) => (
                    <div key={uso} className="bg-card border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-slate-700">{uso}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {product.slug === 'cabezal-para-puntal' && (
            <div className="mt-16 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                  Principales Ventajas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: 'Acero Galvanizado', desc: 'Resistencia y durabilidad para uso en obra' },
                    { title: '4 Vías', desc: 'Orientar las vigas en diferentes direcciones' },
                    { title: 'Compatible con H20', desc: 'Apoyo de una o dos vigas según configuración' },
                    { title: 'Sin Clavos', desc: 'Reducción de perforaciones o daños en las vigas' },
                    { title: 'Montaje Rápido', desc: 'Optimiza tiempos y mano de obra en el armado' },
                    { title: 'Apoyo Simple o Solape', desc: 'Diferentes configuraciones según necesidad' },
                    { title: 'Estabilización', desc: 'Mantiene vigas correctamente posicionadas' },
                    { title: 'Versátil', desc: 'Para diferentes configuraciones de encofrado' },
                  ].map((item) => (
                    <div key={item.title} className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-sm font-bold text-blue-800 mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                  Aplicaciones
                </h2>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                  <p className="text-sm md:text-base text-slate-700">
                    Ideal para sistemas de cimbrado y encofrado con puntales metálicos telescópicos, especialmente en configuraciones que requieren apoyar y estabilizar una o dos vigas H20.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <p className="text-xs md:text-sm text-amber-800">
                  <strong>Nota:</strong> El cabezal es un elemento de apoyo y posicionamiento; la capacidad de carga del sistema depende de factores como el puntal utilizado, separación entre apoyos, configuración de las vigas, geometría de la cimbra y condiciones específicas de la obra.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
      {productVideos && productVideos.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Play className="w-5 h-5" />
                <span className="font-semibold text-sm">Videos del producto</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Mira el producto en acción</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Videos demostrativos de uso, instalación y características técnicas</p>
            </div>
            <div className={`grid gap-5 ${productVideos.length === 1 ? 'max-w-xs mx-auto' : 'grid-cols-2 md:grid-cols-4'}`}>
              {productVideos.map((video) => (
                <div key={video.src} className="group">
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <video
                      controls
                      preload="metadata"
                      className="w-full rounded-lg"
                    >
                      <source src={video.src} type="video/mp4" />
                      Tu navegador no soporta la reproducción de video.
                    </video>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-center">{video.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

