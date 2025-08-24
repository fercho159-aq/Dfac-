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
        <Image 
          src={product.image} 
          alt={product.name} 
          width={400} 
          height={300} 
          className="object-cover w-full h-48" 
          data-ai-hint="construction material" 
        />
        <Badge variant="secondary" className="absolute top-2 left-2">{product.category}</Badge>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-semibold mb-2 leading-tight">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</p>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="#">Cotizar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
