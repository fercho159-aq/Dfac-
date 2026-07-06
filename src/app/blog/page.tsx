import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react';
import { blogPosts, formatBlogDate } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog | DFAC - Accesorios para Cimbra',
  description:
    'Consejos, guías y novedades sobre cimbra, andamios, apuntalamiento y productos para concreto en la Ciudad de México y la Zona Metropolitana.',
  keywords: ['blog', 'cimbra', 'andamios', 'construccion', 'concreto', 'CDMX'],
};

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-card py-20 md:py-28">
        <div className="absolute inset-0 bg-black/50">
          <Image
            src="/Image/Galeria/CARRUSEL-DFAC-D5.jpg"
            alt="Blog DFAC"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            data-ai-hint="construction blog"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black font-headline text-white tracking-tight">
            Nuestro <span className="text-primary">Blog</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-200">
            Consejos, guías y novedades sobre <b className="text-white">cimbra, andamios y productos para concreto</b>,
            pensados para las obras de la Ciudad de México y la Zona Metropolitana.
          </p>
        </div>
      </section>

      {/* Grid de notas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Últimas <span className="text-primary">publicaciones</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Información útil para mantener tu obra <b className="text-foreground">segura y en movimiento</b>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col bg-card rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="construction"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{post.category}</Badge>
                </Link>

                <div className="flex flex-col flex-grow p-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {formatBlogDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {post.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-headline leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-muted-foreground text-sm flex-grow">{post.excerpt}</p>

                  <div className="mt-6">
                    <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold">
                      <Link href={`/blog/${post.slug}`}>
                        Leer más <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            ¿Tienes un proyecto en <span className="italic">puerta?</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Contacta a nuestro equipo para obtener una <b className="text-white">cotización y asesoría</b> personalizada.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/contact">Hablemos de tu Proyecto</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
