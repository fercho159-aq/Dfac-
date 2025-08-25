
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`}>
            <Image 
              src={product.image} 
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
          <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription asChild>
           <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-2xl font-bold text-foreground">${product.price > 0 ? product.price.toFixed(2) : 'Cotizar'}</p>
        <Button asChild>
          <Link href={`/products/${product.slug}`}>Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
