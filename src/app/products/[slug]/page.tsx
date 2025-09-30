
import Image from 'next/image';
import { Product, ProductImage, Attribute, AttributeTerm } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';
import { ContactSection } from '@/components/contact-section';

// This is a new Client Component that will handle the interactive parts.
function ProductDetailsClient({ product }: { product: Product }) {
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

  return (
    <>
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
            <Button asChild variant="outline">
                <Link href="/products" className="inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4"/>
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
            <div className="prose prose-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
            
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
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="secondary" className="w-full bg-green-500 hover:bg-green-600 text-white">
                        <MessageSquare className="mr-2 h-5 w-5" /> Para entregas urgentes envíanos un WhatsApp
                    </Button>
                </a>
            </div>
          </div>
        </div>
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
    <section className="py-16 bg-background">
      <ContactSection />
    </section>
    </>
  );
}


// This is now a Server Component
export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Fetch data on the server
  const jsonDirectory = path.join(process.cwd(), 'public', 'data');
  const fileContents = await fs.readFile(path.join(jsonDirectory, 'products.json'), 'utf8');
  const products = JSON.parse(fileContents);
  
  const foundProductData = products.find((p: any) => p.slug === slug);
  
  let product: Product | null = null;
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
  }

  // Pass the fetched data to the client component
  return <ProductDetailsClient product={product!} />;
}
