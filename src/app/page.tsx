
"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, DraftingCompass, HardHat, MessageSquare, PackageSearch, Scaling, ShoppingCart, Star, Wrench, ArrowRight, Phone, Mail, Truck, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { Product, ProductImage } from '@/lib/data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ContactSection } from '@/components/contact-section';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const Flipbook = dynamic(() => import('@/components/flipbook').then(mod => mod.Flipbook), {
  ssr: false,
  loading: () => <Skeleton className="w-full max-w-5xl aspect-[2/1.414]" />,
});

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
    name: "Luis Mario Reyes",
    quote: "Excelente atención y servicio. En DFAC encontrarás accesorios para cimbra de alta calidad, entregas rápidas y asesoría profesional para cada proyecto. Su equipo siempre está dispuesto a resolver dudas y ofrecer la mejor solución para la obra.",
    rating: 5,
    timeAgo: "hace 3 meses",
  },
  {
    name: "Facturación Cuatro Cuartos",
    quote: "Muy buena atención y servicio, respuesta y entregas rápidas lo cual es muy eficiente para nuestra forma de trabajo, ya llevo 1 año trabajando con ellos y los recomiendo ampliamente.",
    rating: 5,
    timeAgo: "hace 5 meses",
  },
  {
    name: "Alexis Garcia Vazquez",
    quote: "Excelente servicio y atención en DFAC. Tienen una gran variedad de accesorios para cimbra, puntales y maquinaria de muy buena calidad. Además, cuentan con excelentes promociones y precios competitivos.",
    rating: 5,
    timeAgo: "hace 2 meses",
  },
  {
    name: "Rosalba Hernandez Alcantara",
    quote: "¡Excelente servicio, atención oportuna y buenos precios!",
    rating: 5,
    timeAgo: "hace 8 meses",
  },
  {
    name: "Adorian Campos",
    quote: "Una gran empresa, con atención personalizada de primera que maneja productos de excelente calidad y precio.",
    rating: 5,
    timeAgo: "hace 1 año",
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
  { name: 'BBVA Bancomer', src: 'https://upload.wikimedia.org/wikipedia/commons/1/15/BBVA_Bancomer_logo.svg', hint: 'BBVA Bancomer logo' },
  { name: 'Aeropuerto Internacional Felipe Angeles', src: 'https://upload.wikimedia.org/wikipedia/commons/6/60/010aeropuerto-felipe-angeles-2.jpg', hint: 'AIFA airport logo' },
  { name: 'Secretaría de Marina', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/SEMAR_Logo_2019.svg/2560px-SEMAR_Logo_2019.svg.png', hint: 'Secretaria de Marina logo' },
  { name: 'UNAM', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Escudo-UNAM-escalable.svg/1024px-Escudo-UNAM-escalable.svg.png', hint: 'UNAM university logo' },
];

const promotionImages = [
  { src: "/Image/Promos/PROMO-CUNAS.png", alt: "Promoción 1", hint: "construction sale" },
  { src: "/Image/Promos/PROMO-CUNAS1.png", alt: "Promoción 2", hint: "equipment discount" },
  { src: "/Image/Promos/PROMO-MONOS.png", alt: "Promoción 3", hint: "construction sale" },
  { src: "/Image/Promos/PROMO-MONOS1.png", alt: "Promoción 4", hint: "equipment discount" },
  { src: "/Image/Promos/PROMO-MOTORES-5.5HP-REDUCTOR.png", alt: "Promoción 5", hint: "construction sale" },
  { src: "/Image/Promos/PROMO-MOTORES-7HP-REDUCTOR.png", alt: "Promoción 6", hint: "equipment discount" },
  { src: "/Image/Promos/PROMO-MOTORES-9HP.png", alt: "Promoción 7", hint: "construction sale" },
  { src: "/Image/Promos/public/Image/Promos/PROMO-MOTORES-13HP.png", alt: "Promoción 8", hint: "equipment discount" },
  { src: "/Image/Promos/PROMO-MOTORES-15HP.png", alt: "Promoción 9", hint: "construction sale" },
  { src: "/Image/Promos/public/Image/Promos/PROMO-MOTORES.png", alt: "Promoción 10", hint: "equipment discount" }

]

const heroSlides = [
  {
    image: "/Image/Fotos%20Banner/1.jpg",
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
    image: "/Image/CARRUSEL-DFAC17-D5.jpg",
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
    image: "/Image/CARRUSEL-DFAC23-D5.jpg",
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

const solutionsSlides = [
  {
    image: "/Image/Galeria/CARRUSEL-DFAC9-D5.jpg",
    title: "Moños para cimbra",
    hint: "formwork ties"
  },
  {
    image: "/Image/Galeria/CARRUSEL-DFAC11-D5.jpg",
    title: "Puntales para cimbra",
    hint: "shoring props"
  },
  {
    image: "/Image/Galeria/CARRUSEL-DFAC3-D5.jpg",
    title: "Bandas de PVC",
    hint: "PVC waterstop"
  },
  {
    image: "/Image/Galeria/CARRUSEL-DFAC-D5.jpg",
    title: "Cuñas para moño",
    hint: "formwork wedges"
  }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isUrgentDialogOpen, setIsUrgentDialogOpen] = useState(false);
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const catalogPdfUrl = "/archivos/CATALOGO-2026.pdf";


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      const productData = data.map((row: any) => ({
        id: String(row.id),
        name: row.name,
        slug: row.slug,
        price: (Number(row.prices?.price) || 0) / 100,
        description: row.description,
        image: row.images?.[0]?.src || 'https://placehold.co/400x300.png',
        images: row.images,
        category: row.categories?.[0]?.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || 'accesorios'
      }));

      const featuredKeywords = ["puntal", "viga", "moño"];
      const filtered = productData.filter((product: Product) => {
        const productName = product.name.toLowerCase();
        return featuredKeywords.some(keyword => productName.includes(keyword));
      });

      // Prioritize to show one of each if possible, then fill up to 3
      const prioritized: Product[] = [];
      const seenKeywords = new Set();

      for (const keyword of featuredKeywords) {
        const product = filtered.find(p => p.name.toLowerCase().includes(keyword) && !prioritized.some(fp => fp.id === p.id));
        if (product) {
          prioritized.push(product);
          seenKeywords.add(keyword);
        }
      }

      // Add remaining products if we still have less than 3
      if (prioritized.length < 3) {
        const remaining = filtered.filter(p => !prioritized.some(fp => fp.id === p.id));
        prioritized.push(...remaining.slice(0, 3 - prioritized.length));
      }

      setFeaturedProducts(prioritized.slice(0, 3));
    };

    fetchProducts();

    // Show the dialog immediately after the component mounts
    setIsUrgentDialogOpen(true);

  }, []);

  return (
    <>
      {/* Urgent Contact Dialog */}
      <Dialog open={isUrgentDialogOpen} onOpenChange={setIsUrgentDialogOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-headline text-primary">¿Necesitas Material de URGENCIA?</DialogTitle>
            <DialogDescription className="mt-2 text-muted-foreground">
              ¡No te preocupes! Entregamos en tu obra en menos de 24 horas. <br /> Contáctanos ahora mismo.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <a href="https://wa.me/525564220884" target="_blank" rel="noopener noreferrer" className="w-full" onClick={() => { if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) { (window as any).gtag_report_conversion('https://wa.me/525564220884'); } }}>
              <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white">
                <WhatsAppIcon className="mr-2 h-5 w-5" /> Chatear por WhatsApp
              </Button>
            </a>
            <div className="flex items-start gap-4 p-4 bg-secondary rounded-md">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-left">Llámanos para una atención directa</h3>
                <div className="flex flex-col space-y-1 mt-1 text-left">
                  <a href="tel:5525989751" className="text-primary font-semibold hover:underline">01 (55) 2598-9751</a>
                  <a href="tel:5541673745" className="text-primary font-semibold hover:underline">01 (55) 4167-3745</a>
                  <a href="tel:5555715084" className="text-primary font-semibold hover:underline">01 (55) 5571-5084</a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-secondary rounded-md">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-left">Escríbenos</h3>
                <a href="mailto:ventas@cimbrayaccesorios.com.mx" className="text-primary font-semibold hover:underline text-left block">ventas@cimbrayaccesorios.com.mx</a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      {/* Hero Section */}
      <section className="relative w-full h-screen-hero">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full [&>div]:h-full"
          opts={{ loop: true }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-full ml-0">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="h-full pl-0">
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
                      <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tight" dangerouslySetInnerHTML={{ __html: `${slide.title} <span class="inline-block px-4 py-2 mt-2 bg-[#FFC107]/75 text-primary rounded-lg">${slide.subtitle}</span>` }}>
                      </h1>
                      <p className="mt-6 text-lg md:text-xl text-slate-200" dangerouslySetInnerHTML={{ __html: slide.description }}>
                      </p>
                      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-8 py-6">
                          <Link href={slide.cta1_href}>{slide.cta1_text} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-black/30 border-white text-white hover:bg-white hover:text-primary">
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
      </section>

      {/* Client Logos Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-sm font-bold text-muted-foreground tracking-widest uppercase">CONFÍAN EN NOSOTROS</h3>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
            {clientLogos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <Image src={logo.src} alt={logo.name} width={120} height={40} className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" data-ai-hint={logo.hint} />
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
              <div className="rounded-lg shadow-2xl overflow-hidden">
                <video
                  src="/Video/VIDEO-2025-08-05-12-37-33.mp4"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  controls
                />
              </div>
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

      {/* Moños Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <div className="rounded-lg shadow-2xl overflow-hidden">
                <Image
                  src="/Image/Monos.jpeg"
                  alt="Moños para cimbra"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  data-ai-hint="form ties construction"
                />
              </div>
            </div>
            <div className="md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Moños para Cimbra: <span className="text-primary">La clave para un concreto perfecto.</span></h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Asegura la estabilidad y el espesor de tus muros con nuestros moños y cuñas de alta resistencia. Fabricados para soportar la presión del concreto y garantizar un acabado impecable.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500 bg-green-100 rounded-full p-1" />
                  </div>
                  <p className="ml-3 text-lg text-foreground font-semibold">Máxima resistencia a la tensión</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500 bg-green-100 rounded-full p-1" />
                  </div>
                  <p className="ml-3 text-lg text-foreground font-semibold">Fácil y rápido de instalar</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500 bg-green-100 rounded-full p-1" />
                  </div>
                  <p className="ml-3 text-lg text-foreground font-semibold">Disponibles en todas las medidas</p>
                </li>
              </ul>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/products">Ver Moños y Accesorios</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Viga H-20 Promotional Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800/90 via-slate-700/85 to-slate-800/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/Image/Viga-H20/viga-h20-1.png"
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/50 to-yellow-500/50 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-white/10">
                <Image
                  src="/Image/Viga-H20/viga-h20-1.png"
                  alt="Viga H-20 para cimbra"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-white px-6 py-3 rounded-xl shadow-lg font-bold text-sm animate-pulse flex items-center gap-2">
                <Truck className="w-5 h-5" /> Entrega en 24h CDMX
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Viga H-20: <span className="text-primary">Potencia y Versatilidad</span> para tus Encofrados
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Nuestra viga de madera de alta resistencia es la solución ideal para sistemas de encofrado, ofreciendo durabilidad, ligereza y una capacidad de carga excepcional.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-green-400 bg-green-400/20 rounded-full p-1" />
                  </div>
                  <p className="ml-3 text-lg text-white font-semibold">Alta capacidad de carga</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-green-400 bg-green-400/20 rounded-full p-1" />
                  </div>
                  <p className="ml-3 text-lg text-white font-semibold">Ligereza y fácil manejabilidad</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-green-400 bg-green-400/20 rounded-full p-1" />
                  </div>
                  <p className="ml-3 text-lg text-white font-semibold">Reutilizable y sostenible</p>
                </li>
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8">
                  <Link href="/viga-h20">Conoce más <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 bg-white/10">
                  <Link href="/contact">Cotizar Ahora</Link>
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

      {/* Catalog Section */}
      <section id="catalog" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Nuestro <span className="text-primary">Catálogo</span></h2>
            <p className="mt-4 text-lg text-muted-foreground">Explora nuestros productos de manera interactiva.</p>
          </div>
          <Flipbook pdfUrl={catalogPdfUrl} />
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promociones" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black font-headline uppercase text-primary tracking-wider">¡PORQUE TÚ LO PEDISTE! <br /> <span className='inline-block px-4 py-2 mt-2 bg-[#FFC107]/75 text-primary rounded-lg'>DESCUENTOS EXCLUSIVOS</span></h2>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="overflow-hidden rounded-lg shadow-lg cursor-pointer">
                          <Image src={image.src} alt={image.alt} width={400} height={300} className="transition-transform duration-300" data-ai-hint={image.hint} />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-6">
                        <ContactSection />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-white hover:text-primary border-none" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-white hover:text-primary border-none" />
          </Carousel>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/contact">Aprovecha Ahora</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mosaic Gallery Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline uppercase tracking-wider">Queremos que tus proyectos sean tan grandes como tus <span className="text-primary">sueños</span></h2>
          </div>
          <div className="columns-2 md:columns-4 gap-4">
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC-D5.jpg" alt="Proyecto de construcción 1" width={400} height={600} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="construction architecture" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/1620841038-3.jpg" alt="Detalle de andamio" width={400} height={400} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="scaffolding detail" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC2-D5.jpg" alt="Equipo trabajando en obra" width={400} height={400} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="construction workers" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC14-D5.jpg" alt="Estructura de edificio" width={400} height={600} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="building structure" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC4-D6.jpg" alt="Estructura de edificio" width={400} height={600} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="building structure" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC7-D5.jpg" alt="Material de cimbra" width={400} height={400} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="formwork materials" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC12-D5.jpg" alt="Vista aérea de construcción" width={400} height={400} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="construction site aerial" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC11-D5.jpg" alt="Detalle de puntal" width={400} height={600} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="shoring post" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC3-D5.jpg" alt="Proyecto de construcción 3" width={400} height={600} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="construction site" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC23-D5.jpg" alt="Material de andamio" width={400} height={400} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="scaffolding material" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC8-D5.jpg" alt="Trabajador de construcción" width={400} height={600} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="construction worker" />
            </div>
            <div className="mb-4 break-inside-avoid">
              <Image src="/Image/Galeria/CARRUSEL-DFAC9-D5.jpg" alt="Cimbra para construcción" width={400} height={400} className="w-full h-auto rounded-lg shadow-lg" data-ai-hint="formwork" />
            </div>
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/about">Inspírate con Nosotros</Link>
            </Button>
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
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/contact">Comienza tu Cotización</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Videos <span className="text-primary">Explicativos</span></h2>
            <p className="mt-4 text-lg text-muted-foreground">Conoce nuestros productos en acción</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: "/videos/silletas.mp4", title: "Silletas para construcción", description: "Tipos y usos de silletas" },
              { src: "/videos/monos-1.mp4", title: "Moños para cimbra", description: "Características de moños para cimbra" },
              { src: "/videos/puntal-1.mp4", title: "Puntal para cimbra", description: "Uso del puntal estándar" },
            ].map((video) => (
              <div key={video.src} className="group">
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <video controls preload="metadata" className="w-full rounded-lg">
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{video.title}</h3>
                <p className="text-muted-foreground text-sm">{video.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg" variant="outline">
              <Link href="/videos">Ver Todos los Videos <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section — Google Reviews Style */}
      <section id="testimonials" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-3 mb-6">
              <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-lg font-medium text-muted-foreground">Reseñas de Google</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Lo que dicen nuestros clientes</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
              <span className="text-2xl font-bold">4.8</span>
              <span className="text-muted-foreground">· 169 opiniones</span>
            </div>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto mt-10"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-3 h-full">
                    <div className="flex flex-col h-full bg-background rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.timeAgo}</p>
                        </div>
                        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </div>
                      <div className="flex mb-2">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed flex-grow">{testimonial.quote}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>

          <div className="text-center mt-10 space-y-4">
            <Button asChild size="lg" variant="default" className="gap-2">
              <a href="https://g.page/r/CfGBV8-oDBtxEBM/review" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
                </svg>
                Dejar reseña en Google
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">¿Ya compraste con nosotros? Tu opinión nos ayuda a mejorar</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">¿Listo para construir con la <br /> <span className="italic">máxima eficiencia</span>?</h2>
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



