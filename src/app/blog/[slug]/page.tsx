import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin, User } from 'lucide-react';
import { blogPosts, getBlogPost, formatBlogDate } from '@/lib/blog-data';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return { title: 'Nota no encontrada | DFAC' };
  }
  return {
    title: `${post.title} | Blog DFAC`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // Otras notas (hasta 3) para la sección "Sigue leyendo"
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Hero de la nota */}
      <section className="relative bg-card py-20 md:py-28">
        <div className="absolute inset-0 bg-black/60">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            data-ai-hint="construction"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
          <Badge className="bg-primary text-primary-foreground mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-black font-headline text-white tracking-tight">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-200">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              {formatBlogDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {post.readTime} de lectura
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {post.location}
            </span>
          </div>
        </div>
      </section>

      {/* Contenido de la nota */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Button asChild variant="ghost" className="mb-8 -ml-4">
            <Link href="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" /> Volver al blog
            </Link>
          </Button>

          <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 mb-10">
            {post.excerpt}
          </p>

          <article className="space-y-10">
            {post.content.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-lg text-foreground/80 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </article>

          {/* CTA dentro de la nota */}
          <div className="mt-12 bg-card rounded-lg p-8 text-center shadow-md">
            <h3 className="text-2xl font-bold font-headline">¿Necesitas material para tu obra?</h3>
            <p className="mt-2 text-muted-foreground">
              Cotiza con nosotros y recibe tu pedido en <b className="text-foreground">menos de 24 horas</b>.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Solicitar cotización</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/products">Ver productos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sigue leyendo */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-headline">
                Sigue <span className="text-primary">leyendo</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="group flex flex-col bg-background rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <Link href={`/blog/${related.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="construction"
                    />
                  </Link>
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-lg font-bold font-headline leading-snug">
                      <Link href={`/blog/${related.slug}`} className="hover:text-primary transition-colors">
                        {related.title}
                      </Link>
                    </h3>
                    <div className="mt-4">
                      <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold">
                        <Link href={`/blog/${related.slug}`}>
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
      )}
    </>
  );
}
