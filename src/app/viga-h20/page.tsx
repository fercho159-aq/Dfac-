"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Check, Truck, Shield, Leaf, Weight, Clock, ArrowRight, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

const heroSlides = [
  {
    title: "Viga H-20: Potencia y Versatilidad para sus Encofrados",
    description: "Nuestra viga de madera de alta resistencia es la solución ideal para sistemas de encofrado, ofreciendo durabilidad, ligereza y una capacidad de carga excepcional. ¡Entregamos en menos de 24 horas en CDMX y Zona Metropolitana!",
    image: "/Image/Viga-H20/viga-h20-1.png"
  },
  {
    title: "Innovación y Calidad en Cada Proyecto",
    description: "Comprometidos con la excelencia, ofrecemos productos que superan los estándares de la industria para garantizar la seguridad y eficiencia en su obra.",
    image: "/Image/Viga-H20/viga-h20-2.png"
  },
  {
    title: "Soluciones a la Medida de sus Necesidades",
    description: "Nuestro equipo de expertos está listo para asesorarle y proveerle las mejores soluciones de encofrado para optimizar sus resultados.",
    image: "/Image/Viga-H20/viga-h20-3.png"
  }
];

const advantages = [
  {
    icon: <Weight className="w-8 h-8" />,
    title: "Alta Capacidad de Carga",
    description: "Diseñadas para soportar grandes cargas, garantizando la seguridad y estabilidad del encofrado."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Ligereza y Manejabilidad",
    description: "Su bajo peso facilita el transporte, montaje y desmontaje, optimizando los tiempos de trabajo."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Durabilidad y Resistencia",
    description: "Fabricadas con madera de alta calidad y uniones robustas que aseguran una larga vida útil."
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Reutilizables y Sostenibles",
    description: "Pueden ser utilizadas en múltiples proyectos, reduciendo costos y el impacto ambiental."
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Entrega Express",
    description: "Reciba su pedido en menos de 24 horas en CDMX y Zona Metropolitana."
  }
];

const productImages = [
  { src: "/Image/Viga-H20/viga-h20-1.png", alt: "Viga H-20 vista lateral" },
  { src: "/Image/Viga-H20/viga-h20-2.png", alt: "Vigas H-20 apiladas en almacén" },
  { src: "/Image/Viga-H20/viga-h20-3.png", alt: "Vigas H-20 en uso" }
];

export default function VigaH20Page() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <>
      {/* Hero Section with Carousel */}
      <section className="relative w-full min-h-[80vh]">
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
                <div className="relative w-full min-h-[80vh]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover brightness-[0.35]"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                      <div className="inline-block px-4 py-2 bg-primary/90 text-white text-sm font-bold rounded-full mb-6 uppercase tracking-wider animate-pulse">
                        🚚 Entrega en menos de 24 horas
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline tracking-tight leading-tight">
                        {slide.title}
                      </h1>
                      <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-3xl mx-auto">
                        {slide.description}
                      </p>
                      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                          <Link href="/contact">Solicitar Cotización <ArrowRight className="ml-2 h-5 w-5"/></Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm">
                          <a href="https://wa.me/525564220884" target="_blank" rel="noopener noreferrer">
                            <MessageSquare className="mr-2 h-5 w-5" /> WhatsApp
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-white hover:text-primary border-none h-12 w-12" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-white hover:text-primary border-none h-12 w-12" />
        </Carousel>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                DFAC Accesorios para Cimbras
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Expertos en <span className="text-primary">Soluciones de Encofrado</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Con años de experiencia en el sector de la construcción, en DFAC nos especializamos en proveer accesorios para cimbra de la más alta calidad. Nuestro compromiso es ofrecer productos innovadores y eficientes, como la viga H-20, que garantizan la seguridad y productividad en cada obra.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-white">D</div>
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold border-2 border-white">F</div>
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold border-2 border-white">A</div>
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold border-2 border-white">C</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">+500 proyectos</strong> completados con éxito
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl shadow-2xl overflow-hidden border-4 border-white/20">
                <video
                  src="/Video/VIDEO-2025-08-05-12-37-33.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  controls
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-4 rounded-xl shadow-lg">
                <Clock className="w-8 h-8 mb-2" />
                <p className="text-sm font-bold">Entrega Express</p>
                <p className="text-xs opacity-90">En menos de 24h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specifications Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-bold rounded-full mb-4 uppercase tracking-wider border border-primary/30">
              ⭐ Producto Destacado
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Viga H-20 para Cimbra
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Nuestra viga H-20 de madera de alta resistencia es la solución ideal para sistemas de encofrado, ofreciendo durabilidad, ligereza y una capacidad de carga excepcional.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/Image/Viga-H20/viga-h20-1.png"
                  alt="Viga H-20"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg border border-white/10">
                  <Image
                    src="/Image/Viga-H20/viga-h20-2.png"
                    alt="Vigas H-20 apiladas"
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg border border-white/10">
                  <Image
                    src="/Image/Viga-H20/viga-h20-3.png"
                    alt="Vigas H-20 en uso"
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Specifications Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-2 text-primary">
                VIGA H20 3.90x0.20x0.04 METROS CON TAPÓN
              </h3>
              <p className="text-slate-300 mb-6">
                Fabricada con madera de alta calidad y un diseño robusto, nuestra viga H-20 garantiza la máxima eficiencia y seguridad en sus proyectos de construcción. El tapón protector integrado aumenta su durabilidad.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">L</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Largo</p>
                    <p className="text-xl font-bold">3.90 metros</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">A</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Alto</p>
                    <p className="text-xl font-bold">0.20 metros (20 cm)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">An</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Ancho</p>
                    <p className="text-xl font-bold">0.04 metros (4 cm)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button asChild size="lg" className="w-full text-lg py-6">
                  <Link href="/contact">Cotizar Vigas H-20 <ArrowRight className="ml-2 h-5 w-5"/></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Por qué elegir <span className="text-primary">Vigas H-20</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra los beneficios que hacen de nuestras vigas H-20 la elección preferida por profesionales de la construcción.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {advantage.icon}
                  </div>
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Location Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Visítenos o <span className="text-primary">Contáctenos</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Encuentre nuestra ubicación o póngase en contacto con nuestro equipo de ventas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Dirección</h3>
                    <p className="text-muted-foreground">
                      Cuauhtémoc 105, San Pedro Iztacalco, Iztacalco, 08220 Ciudad de México, CDMX
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                    <a href="https://wa.me/525564220884" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
                      +52 55 6422 0884
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Respuesta inmediata</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Teléfonos</h3>
                    <div className="space-y-1">
                      <a href="tel:5525989751" className="text-primary font-semibold hover:underline block">01 (55) 2598-9751</a>
                      <a href="tel:5541673745" className="text-primary font-semibold hover:underline block">01 (55) 4167-3745</a>
                      <a href="tel:5555715084" className="text-primary font-semibold hover:underline block">01 (55) 5571-5084</a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <a href="mailto:ventas@cimbrayaccesorios.com.mx" className="text-primary font-semibold hover:underline">
                      ventas@cimbrayaccesorios.com.mx
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Map */}
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-xl border-4 border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0731855893037!2d-99.09095892393851!3d19.403539681900736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fc7c5e9f7a0b%3A0x5c09c7c6c1c00c0b!2sCuauht%C3%A9moc%20105%2C%20San%20Pedro%20Iztacalco%2C%20Iztacalco%2C%2008220%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1699999999999!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-yellow-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/Image/Viga-H20/viga-h20-1.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            ¿Listo para equipar tu obra con <br/>
            <span className="italic">Vigas H-20 de alta calidad?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
            Contacta a nuestros expertos para una <strong>cotización inmediata</strong> y sin compromiso. 
            Entregamos en <strong>menos de 24 horas</strong> en CDMX y Zona Metropolitana.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/contact">Solicitar Cotización</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              <a href="https://wa.me/525564220884" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" /> WhatsApp Directo
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
