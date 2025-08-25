
import Image from 'next/image';
import { Product, ProductImage } from '@/lib/data';
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
              {product.price > 0 ? `$${product.price.toFixed(2)}` : 'Precio a cotizar'}
            </p>
            <div className="prose prose-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
            
            <div className="mt-8">
                <Button size="lg" asChild>
                    <Link href="/contact">
                        Solicitar cotización
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="py-16 bg-card">
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
      category: foundProductData.categories?.[0]?.name || 'Accesorios'
    };
  }

  // Pass the fetched data to the client component
  return <ProductDetailsClient product={product!} />;
}
