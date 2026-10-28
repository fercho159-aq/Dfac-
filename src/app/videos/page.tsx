import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Videos Explicativos — DFAC Accesorios para Cimbra',
  description: 'Videos explicativos de nuestros productos: puntales, silletas, moños para cimbra, vibradores, malacate y más. Aprende sobre el uso y características de cada producto.',
};

const videoCategories = [
  {
    title: "Puntales",
    videos: [
      { src: "/videos/puntal-1.mp4", title: "Puntal para cimbra", description: "Características y uso del puntal estándar" },
      { src: "/videos/puntal-3.mp4", title: "Puntal — Demostración", description: "Demostración del funcionamiento del puntal" },
      { src: "/videos/puntal-4.mp4", title: "Puntal — Instalación", description: "Proceso de instalación del puntal en obra" },
      { src: "/videos/puntal-5.mp4", title: "Puntal — Especificaciones", description: "Especificaciones técnicas del puntal" },
    ]
  },
  {
    title: "Silletas",
    videos: [
      { src: "/videos/silletas.mp4", title: "Silletas para construcción", description: "Tipos y usos de silletas en la construcción" },
      { src: "/videos/silletas-2.mp4", title: "Silletas — Aplicación", description: "Aplicación de silletas en obra" },
      { src: "/videos/silleta-1.mp4", title: "Silleta individual", description: "Demostración de silleta individual" },
      { src: "/videos/silleta-2.mp4", title: "Silleta — Instalación", description: "Proceso de colocación de silletas" },
    ]
  },
  {
    title: "Moños para cimbra",
    videos: [
      { src: "/videos/monos-1.mp4", title: "Moños para cimbra", description: "Tipos y características de moños para cimbra" },
      { src: "/videos/mono-3.mp4", title: "Moño — Demostración", description: "Demostración del uso del moño" },
      { src: "/videos/mono-rondana.mp4", title: "Moño con rondana", description: "Moño con rondana para cimbra" },
      { src: "/videos/mono-medidas.mp4", title: "Moño — Medidas", description: "Medidas disponibles de moños" },
    ]
  },
  {
    title: "Otros productos",
    videos: [
      { src: "/videos/banda-pvc.mp4", title: "Banda PVC", description: "Banda de PVC para juntas de construcción" },
      { src: "/videos/capuchones.mp4", title: "Capuchones", description: "Capuchones de seguridad para varilla" },
      { src: "/videos/chicotes.mp4", title: "Chicotes", description: "Chicotes para conexiones en obra" },
      { src: "/videos/flota-de-magnesio.mp4", title: "Flota de magnesio", description: "Flota de magnesio para acabados de concreto" },
      { src: "/videos/malacate.mp4", title: "Malacate", description: "Malacate para elevación de material" },
      { src: "/videos/vibrador-para-concreto.mp4", title: "Vibrador para concreto", description: "Vibrador para compactación de concreto" },
      { src: "/videos/vibradores-electrico-y-gasolina.mp4", title: "Vibradores eléctrico y a gasolina", description: "Comparativa de vibradores eléctrico y a gasolina" },
    ]
  }
];

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Videos Explicativos</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Conoce nuestros productos en acción. Videos demostrativos de uso, instalación y características técnicas.
          </p>
        </div>
      </section>

      {videoCategories.map((category) => (
        <section key={category.title} className="py-16 even:bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-headline mb-8">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.videos.map((video) => (
                <div key={video.src} className="group">
                  <div className="relative rounded-lg overflow-hidden shadow-lg bg-black">
                    <video
                      controls
                      preload="metadata"
                      className="w-full aspect-video"
                      poster=""
                    >
                      <source src={video.src} type="video/mp4" />
                      Tu navegador no soporta la reproducción de video.
                    </video>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{video.title}</h3>
                  <p className="text-muted-foreground text-sm">{video.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-headline">¿Necesitas más información?</h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Contáctanos para una cotización personalizada o asesoría técnica sobre nuestros productos.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/contact">Solicitar Cotización</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              <Link href="/products">Ver Catálogo <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
