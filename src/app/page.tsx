
"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, DraftingCompass, HardHat, PackageSearch, Scaling, ShoppingCart, Star, Wrench, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { Product } from '@/lib/data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

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

const testimonials = [
    {
    name: "Constructora XYZ",
    quote: "La calidad de los puntales y la velocidad de entrega de DFAC no tienen comparación. Son nuestro proveedor de confianza para cada obra.",
    rating: 5,
  },
  {
    name: "Ing. Roberto Morales",
    quote: "El equipo de DFAC siempre está dispuesto a asesorarte. Gracias a ellos, optimizamos nuestros costos de apuntalamiento en un 15%.",
    rating: 5,
  },
  {
    name: "ARQ. Sofia Castillo",
    quote: "Los andamios son robustos y seguros. La plataforma antideslizante es un detalle que marca la diferencia en la seguridad del personal.",
    rating: 5,
  },
   {
    name: "Grupo Constructor Alfa",
    quote: "Tuvimos un requerimiento de último minuto y DFAC nos resolvió en tiempo récord. Su servicio al cliente es excepcional.",
    rating: 5,
  },
  {
    name: "Proyectos Verticales S.A.",
    quote: "Su catálogo es muy completo. Encontramos todo lo que necesitábamos para el sistema de cimbra de nuestro nuevo edificio en un solo lugar.",
    rating: 5,
  },
    {
    name: "Desarrollos Urbanos MX",
    quote: "La asesoría técnica que recibimos fue clave para el éxito de nuestro proyecto más reciente. ¡Totalmente recomendados!",
    rating: 5
  },
  {
    name: "Edifica Corp.",
    quote: "Los precios son muy competitivos y la calidad del material es de primera. No hemos tenido un solo problema.",
    rating: 5
  },
];

const processSteps = [
    {
      icon: <PackageSearch className="w-12 h-12 text-primary" />,
      title: "1. Elige tu material",
      description: "Explora nuestro catálogo y selecciona los productos que necesitas."
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-primary" />,
      title: "2. Cotiza y Confirma",
      description: "Recibe tu cotización al instante y confirma tu pedido con un asesor."
    },
    {
      icon: <HardHat className="w-12 h-12 text-primary" />,
      title: "3. Recibe en tu Obra",
      description: "Recibe tu material en menos de 24 horas, listo para usarse."
    }
];

const clientLogos = [
    { name: 'Client Logo 1', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
    { name: 'Client Logo 2', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
    { name: 'Client Logo 3', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
    { name: 'Client Logo 4', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
    { name: 'Client Logo 5', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
    { name: 'Client Logo 6', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
];

const promotionImages = [
    { src: "https://placehold.co/400x300.png", alt: "Promoción 1", hint: "construction promotion" },
    { src: "https://placehold.co/400x300.png", alt: "Promoción 2", hint: "building offer" },
    { src: "https://placehold.co/400x300.png", alt: "Promoción 3", hint: "construction sale" },
    { src: "https://placehold.co/400x300.png", alt: "Promoción 4", hint: "equipment discount" },
    { src: "https://placehold.co/400x300.png", alt: "Promoción 5", hint: "formwork deal" },
    { src: "https://placehold.co/400x300.png", alt: "Promoción 6", hint: "scaffolding special" },
]

const heroSlides = [
    {
        image: "https://placehold.co/1920x1080.png",
        hint: "construction site scaffolding",
        title: "Tu Socio en Cimbra y Andamiaje",
        subtitle: "Calidad y Velocidad Garantizadas",
        description: "En DFAC, te damos la <b class='text-white'>confianza</b> para construir sin límites. Accesorios de alta resistencia con <b class='text-primary'>entrega en tu obra en menos de 24 horas.</b>",
        cta1_text: "Ver Productos",
        cta1_href: "/products",
        cta2_text: "Solicitar Cotización",
        cta2_href: "/contact"
    },
    {
        image: "https://placehold.co/1920x1080.png",
        hint: "construction workers logistics",
        title: "Entrega Inmediata en tu Obra",
        subtitle: "Material listo en menos de 24H",
        description: "Sabemos que tu tiempo es oro. Nuestro sistema logístico asegura que tengas lo que necesitas, justo cuando lo necesitas.",
        cta1_text: "Conoce más",
        cta1_href: "/about",
        cta2_text: "Contáctanos",
        cta2_href: "/contact"
    },
    {
        image: "https://placehold.co/1920x1080.png",
        hint: "engineer planning construction",
        title: "Asesoría Experta para tu Proyecto",
        subtitle: "Maximizamos tu seguridad y eficiencia",
        description: "No solo vendemos productos, ofrecemos soluciones. Nuestro equipo te acompaña para garantizar el éxito de tu obra.",
        cta1_text: "Nuestros Servicios",
        cta1_href: "/faq",
        cta2_text: "Hablar con un experto",
        cta2_href: "/contact"
    }
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    setIsClient(true);
    
    const fetchProducts = async () => {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      const productData = data.map((row: any) => ({
        id: String(row.id),
        name: row.name,
        price: (Number(row.prices.price) || 0) / 100,
        description: row.description,
        image: row.images[0]?.src || 'https://placehold.co/400x300.png',
        category: row.categories[0]?.name || 'Accesorios'
      }));
      setFeaturedProducts(productData.slice(0, 3));
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
       <section className="relative w-full h-screen-hero">
        {isClient ? (
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-full"
            opts={{ loop: true }}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      layout="fill"
                      objectFit="cover"
                      className="brightness-50"
                      data-ai-hint={slide.hint}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tight" dangerouslySetInnerHTML={{ __html: `${slide.title} <span class="inline-block px-4 py-2 mt-2 bg-[#FFC107]/75 text-primary rounded-lg">${slide.subtitle}</span>`}}>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-slate-200" dangerouslySetInnerHTML={{ __html: slide.description }}>
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                          <Button asChild size="lg" className="text-lg px-8 py-6">
                            <Link href={slide.cta1_href}>{slide.cta1_text} <ArrowRight className="ml-2 h-5 w-5"/></Link>
                          </Button>
                          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-primary">
                            <Link href={slide.cta2_href}>{slide.cta2_text}</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-white hover:text-primary border-none" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-white hover:text-primary border-none" />
          </Carousel>
        ) : (
          <div className="w-full h-full bg-card" />
        )}
      </section>

      {/* Client Logos Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-sm font-bold text-muted-foreground tracking-widest uppercase">CONFIAN EN NOSOTROS</h3>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
                {clientLogos.map((logo, index) => (
                    <div key={index} className="flex justify-center">
                        <Image src={logo.src} alt={logo.name} width={120} height={40} className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" data-ai-hint={logo.hint}/>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Benefits/Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image src="https://placehold.co/600x400.png" alt="Equipo de construcción" width={600} height={400} className="rounded-lg shadow-2xl" data-ai-hint="construction equipment" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Tu proyecto no puede esperar. <span className="text-primary">El nuestro tampoco.</span></h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Resolvemos los problemas más críticos de tu obra: <b className="text-foreground">tiempo, calidad y seguridad</b>.
              </p>
              <ul className="mt-8 space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500 bg-green-100 rounded-full p-1" />
                    </div>
                    <p className="ml-3 text-lg text-foreground font-semibold">{feature}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/contact">Cotiza tu Proyecto</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Productos Destacados</h2>
            <p className="mt-4 text-lg text-muted-foreground">Material <b className="text-foreground">listo para resolver</b> las necesidades de tu obra.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
             <Button asChild size="lg">
                <Link href="/products">Ver Todo el Catálogo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promociones" className="py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black font-headline uppercase text-primary tracking-wider">¡PORQUE TÚ LO PEDISTE! <br/> <span className='inline-block px-4 py-2 mt-2 bg-[#FFC107]/75 text-primary rounded-lg'>DESCUENTOS EXCLUSIVOS</span></h2>
              </div>
              <Carousel 
                  opts={{
                      align: "start",
                      loop: true,
                  }}
                  className="w-full"
              >
                  <CarouselContent>
                      {promotionImages.map((image, index) => (
                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-1">
                                  <div className="overflow-hidden rounded-lg shadow-lg">
                                      <Image src={image.src} alt={image.alt} width={400} height={300} className="hover:scale-105 transition-transform duration-300" data-ai-hint={image.hint} />
                                  </div>
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
              </Carousel>
          </div>
      </section>

      {/* Mosaic Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline uppercase tracking-wider">Queremos que tus proyectos sean tan grandes como tus <span className="text-primary">sueños</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x600.png" alt="Proyecto de construcción 1" width={400} height={600} className="hover:scale-105 transition-transform duration-300" data-ai-hint="construction architecture" />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg">
                 <Image src="https://placehold.co/400x400.png" alt="Detalle de andamio" width={400} height={400} className="hover:scale-105 transition-transform duration-300" data-ai-hint="scaffolding detail" />
              </div>
            </div>
            <div className="grid gap-4">
               <div className="overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x400.png" alt="Equipo trabajando en obra" width={400} height={400} className="hover:scale-105 transition-transform duration-300" data-ai-hint="construction workers" />
              </div>
               <div className="overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x600.png" alt="Estructura de edificio" width={400} height={600} className="hover:scale-105 transition-transform duration-300" data-ai-hint="building structure" />
              </div>
            </div>
            <div className="grid gap-4">
               <div className="overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x600.png" alt="Proyecto de construcción 2" width={400} height={600} className="hover:scale-105 transition-transform duration-300" data-ai-hint="modern architecture" />
              </div>
               <div className="overflow-hidden rounded-lg shadow-lg">
                 <Image src="https://placehold.co/400x400.png" alt="Material de cimbra" width={400} height={400} className="hover:scale-105 transition-transform duration-300" data-ai-hint="formwork materials" />
              </div>
            </div>
             <div className="grid gap-4">
               <div className="overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x400.png" alt="Vista aérea de construcción" width={400} height={400} className="hover:scale-105 transition-transform duration-300" data-ai-hint="construction site aerial" />
              </div>
               <div className="overflow-hidden rounded-lg shadow-lg">
                <Image src="https://placehold.co/400x600.png" alt="Detalle de puntal" width={400} height={600} className="hover:scale-105 transition-transform duration-300" data-ai-hint="shoring post" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">Nuestro Proceso en <span className="text-primary">3 Pasos Simples</span></h2>
                  <p className="mt-4 text-lg text-muted-foreground">Comienza a construir de forma más <b className="text-foreground">rápida y segura</b>.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                  {processSteps.map((step) => (
                      <div key={step.title} className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md border">
                          <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">{step.icon}</div>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          <p className="text-muted-foreground mt-2">{step.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">No solo lo decimos nosotros</h2>
            <p className="mt-4 text-lg text-muted-foreground">Nuestros <b className="text-foreground">clientes</b> son nuestra mejor carta de presentación.</p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-4 h-full">
                    <Card className="flex flex-col justify-between h-full text-center p-6">
                       <CardContent className="flex-grow mb-4">
                        <p className="text-foreground text-lg italic">"{testimonial.quote}"</p>
                      </CardContent>
                      <div className="flex items-center justify-center mb-2">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      <CardTitle className="text-base font-semibold">- {testimonial.name}</CardTitle>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-50px]" />
            <CarouselNext className="right-[-50px]" />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">¿Listo para construir con la <br/> <span className="italic">máxima eficiencia</span>?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Contacta a nuestros expertos para una <b className="text-white">cotización inmediata</b> y sin compromiso. Recibe la mejor asesoría para tu proyecto <b className="text-white">hoy mismo</b>.
          </p>
          <div className="mt-8">
             <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/contact">Solicitar Información</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
