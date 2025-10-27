
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  searchParams?: { [key: string]: string | string[] | undefined };
}

function cleanSearchParams(params: { [key: string]: string | string[] | undefined } | undefined): Record<string, string> {
    if (!params) return {};
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

export function ProductCard({ product, searchParams }: ProductCardProps) {
  const imagePath = product.image || 'https://placehold.co/400x300.png';
  const productLink = `/products/${product.slug}?${new URLSearchParams(cleanSearchParams(searchParams))}`;
  
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardHeader className="p-0 relative">
        <Link href={productLink}>
            <Image 
              src={imagePath}
              alt={product.name} 
              width={400} 
              height={300} 
              className="object-cover w-full h-48" 
              data-ai-hint="construction material" 
            />
        </Link>
        <Badge variant="secondary" className="absolute top-2 left-2">{product.category}</Badge>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-semibold mb-2 leading-tight">
          <Link href={productLink} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription>
           <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-2xl font-bold text-foreground">Cotizar</p>
        <Button asChild>
          <Link href={productLink}>Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
