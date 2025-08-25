
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Eye, Gem, Handshake, ShieldCheck, Star, Target, Users, Zap } from 'lucide-react';

const teamMembers = [
  {
    name: "Juan Pérez",
    role: "Fundador y Director General",
    image: "https://placehold.co/300x300.png",
    bio: "Con más de 20 años en la industria, Juan lidera DFAC con una visión clara: ofrecer calidad y confianza a cada cliente.",
  },
  {
    name: "Ana García",
    role: "Gerente de Operaciones",
    image: "https://placehold.co/300x300.png",
    bio: "Ana asegura que cada pedido llegue a tiempo y en perfectas condiciones, optimizando nuestra promesa de entrega en 24 horas.",
  },
  {
    name: "Carlos Rodríguez",
    role: "Jefe de Asesoría Técnica",
    image: "https://placehold.co/300x300.png",
    bio: "Carlos y su equipo están dedicados a encontrar la solución perfecta para los desafíos técnicos de tu obra.",
  },
];

const milestones = [
  { year: "2010", event: "Fundación de DFAC con la misión de innovar en el mercado de la cimbra." },
  { year: "2015", event: "Expandimos nuestro catálogo para incluir sistemas de andamiaje certificados." },
  { year: "2018", event: "Implementamos nuestro sistema de logística para garantizar entregas en 24 horas." },
  { year: "2022", event: "Alcanzamos la cifra de 1,000 proyectos exitosos a nivel nacional." },
];

const differentiators = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Velocidad Insuperable",
      description: "Nuestro sistema logístico garantiza la entrega de tu material en menos de 24 horas."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Calidad Certificada",
      description: "Todos nuestros productos cumplen con los más altos estándares de seguridad y resistencia."
    },
    {
      icon: <Handshake className="w-8 h-8 text-primary" />,
      title: "Asesoría Personalizada",
      description: "Nuestro equipo de expertos te acompaña para asegurar la mejor solución para tu proyecto."
    }
];

const clientLogos = [
    { name: 'Client Logo 1', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
    { name: 'Client Logo 2', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
    { name: 'Client Logo 3', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
    { name: 'Client Logo 4', src: 'https://placehold.co/150x60.png' , hint: 'company logo'},
];


export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-card py-20 md:py-32">
        <div className="absolute inset-0 bg-black/50">
            <Image src="https://placehold.co/1200x400.png" alt="Equipo de DFAC trabajando" layout="fill" objectFit="cover" className="opacity-30" data-ai-hint="team working construction" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black font-headline text-white tracking-tight">
            Somos el <b className="text-primary">cimiento</b> de tus <span className="inline-block px-4 py-2 mt-2 bg-[#FFC107]/75 text-primary rounded-lg">grandes proyectos</span>.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-200">
            Más que un proveedor, somos tu <b className="text-white">socio estratégico</b> en cada obra, comprometidos con la <b className="text-white">seguridad</b>, la <b className="text-white">calidad</b> y la <b className="text-white">eficiencia</b>.
          </p>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">¿Quiénes Somos?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
            En DFAC, nos dedicamos a proveer <b className="text-foreground">soluciones de cimbra y andamiaje</b> que garantizan seguridad, eficiencia y rapidez en cada obra. Nacimos para resolver un problema clave en la construcción: la necesidad de contar con material de alta resistencia de forma inmediata. Por eso, nuestra promesa es simple y poderosa: <span className="font-semibold text-primary">calidad que soporta tus ideas, entregada en menos de 24 horas.</span>
            </p>
        </div>
      </section>
      
      {/* Misión, Visión, Valores */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <Target className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold">Misión</h3>
                    <p className="text-muted-foreground mt-2">Facilitar el <b className="text-foreground">éxito</b> de cada proyecto con accesorios de alta calidad y un servicio de entrega inigualable.</p>
                </div>
                <div className="flex flex-col items-center">
                    <Eye className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold">Visión</h3>
                    <p className="text-muted-foreground mt-2">Ser el proveedor <b className="text-foreground">líder y de mayor confianza</b> en soluciones para cimbra y andamiaje en todo el país.</p>
                </div>
                <div className="flex flex-col items-center">
                    <Gem className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold">Valores</h3>
                    <p className="text-muted-foreground mt-2"><b className="text-foreground">Confianza, Innovación, Responsabilidad, Pasión por el cliente.</b></p>
                </div>
            </div>
        </div>
      </section>

      {/* Nuestra Historia */}
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Nuestra <span className="text-primary">Trayectoria</span></h2>
                    <p className="mt-4 text-lg text-muted-foreground">Más de una década construyendo <b className="text-foreground">confianza</b>.</p>
                </div>
                <div className="relative">
                    {/* Linea de tiempo */}
                    <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>

                    {milestones.map((milestone, index) => (
                       <div key={index} className="mb-8 flex md:justify-between md:items-center w-full">
                           {index % 2 === 0 ? (
                               <>
                                   {/* Contenido Izquierda */}
                                   <div className="hidden md:block w-5/12 text-right">
                                       <div className="w-full bg-card p-4 rounded-lg shadow-md">
                                           <p className="text-foreground font-semibold">{milestone.event}</p>
                                       </div>
                                   </div>
                                   {/* Círculo */}
                                   <div className="z-10 flex items-center justify-center bg-primary text-primary-foreground w-12 h-12 rounded-full font-bold text-lg">{milestone.year}</div>
                                   {/* Contenido Derecha (Mobile) */}
                                   <div className="w-full md:w-5/12 bg-card p-4 rounded-lg shadow-md ml-4 md:ml-0 md:hidden">
                                       <p className="text-foreground font-semibold">{milestone.event}</p>
                                   </div>
                                    <div className="hidden md:block w-5/12"></div>
                               </>
                           ) : (
                               <>
                                    {/* Placeholder Izquierda */}
                                   <div className="hidden md:block w-5/12"></div>
                                    {/* Círculo */}
                                   <div className="z-10 flex items-center justify-center bg-primary text-primary-foreground w-12 h-12 rounded-full font-bold text-lg">{milestone.year}</div>
                                    {/* Contenido Derecha */}
                                   <div className="w-full md:w-5/12 bg-card p-4 rounded-lg shadow-md ml-4 md:ml-0">
                                       <p className="text-foreground font-semibold">{milestone.event}</p>
                                   </div>
                               </>
                           )}
                       </div>
                   ))}
                </div>
            </div>
        </section>

      {/* Equipo Humano */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Nuestro <span className="text-primary">Equipo</span></h2>
            <p className="mt-4 text-lg text-muted-foreground">Las personas que hacen posible nuestro <b className="text-foreground">compromiso</b>.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Image src={member.image} alt={member.name} width={150} height={150} className="rounded-full mx-auto shadow-lg" data-ai-hint="person professional portrait" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-semibold mt-1">{member.role}</p>
                  <p className="text-muted-foreground mt-2 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">¿Por qué Confiar en <span className="text-primary">DFAC?</span></h2>
                  <p className="mt-4 text-lg text-muted-foreground">Te damos más que productos, te damos <b className="text-foreground">soluciones</b>.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                  {differentiators.map((d) => (
                      <div key={d.title} className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
                          <div className="bg-primary-foreground p-4 rounded-full mb-4">{d.icon}</div>
                          <h3 className="text-xl font-bold">{d.title}</h3>
                          <p className="text-muted-foreground mt-2">{d.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Clientes */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-sm font-bold text-muted-foreground tracking-widest uppercase">EMPRESAS QUE CONSTRUYEN CON NOSOTROS</h3>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
                {clientLogos.map((logo, index) => (
                    <div key={index} className="flex justify-center">
                        <Image src={logo.src} alt={logo.name} width={120} height={40} className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" data-ai-hint={logo.hint}/>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">¿Listo para llevar tu proyecto al <br/><span className="italic">siguiente nivel?</span></h2>
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
