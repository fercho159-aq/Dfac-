import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, DraftingCompass, HardHat, Scaling, Wrench } from 'lucide-react';
import Image from 'next/image';

const categories = [
  { name: 'Anclajes', icon: <Wrench className="w-10 h-10 mx-auto mb-4 text-primary" />, href: "/products" },
  { name: 'Apuntalamiento', icon: <Scaling className="w-10 h-10 mx-auto mb-4 text-primary" />, href: "/products" },
  { name: 'Andamios', icon: <HardHat className="w-10 h-10 mx-auto mb-4 text-primary" />, href: "/products" },
  { name: 'Accesorios', icon: <DraftingCompass className="w-10 h-10 mx-auto mb-4 text-primary" />, href: "/products" },
];

const features = [
  "Entrega garantizada en 24 horas",
  "Material de la más alta calidad",
  "Asesoría experta y personalizada",
  "Precios competitivos en el mercado"
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black font-headline text-foreground tracking-tight">
            Soluciones para Cimbra, <span className="text-primary">Construcción sin Límites.</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            En DFAC, proveemos los mejores accesorios para cimbra y andamiaje con la promesa de entrega más rápida del mercado.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/products">Ver Productos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="#">Cotizar Ahora</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Nuestras Categorías</h2>
            <p className="mt-4 text-lg text-muted-foreground">Explora nuestra amplia gama de productos para cada necesidad de tu obra.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link href={category.href} key={category.name} className="block">
                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
                  <CardHeader>
                    {category.icon}
                    <CardTitle className="text-xl font-semibold">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-accent font-semibold">Ver más &rarr;</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image src="https://placehold.co/600x400.png" alt="Equipo de construcción" width={600} height={400} className="rounded-lg shadow-2xl" data-ai-hint="construction equipment" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">¿Por qué elegir DFAC?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Estamos comprometidos con el éxito de tu proyecto, ofreciendo calidad, velocidad y soporte inigualables.
              </p>
              <ul className="mt-8 space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500 bg-green-100 rounded-full p-1" />
                    </div>
                    <p className="ml-3 text-lg text-foreground">{feature}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="#">Hablemos de tu proyecto</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">¿Listo para construir con nosotros?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Contacta a nuestros expertos para una cotización inmediata y sin compromiso.
          </p>
          <form className="mt-8 max-w-md mx-auto flex gap-2">
            <Input type="email" placeholder="Tu correo electrónico" className="py-6" required />
            <Button type="submit" size="lg" className="py-6">Solicitar Información</Button>
          </form>
        </div>
      </section>
    </>
  );
}
