
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <div className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-headline">Hablemos de tu <span className="inline-block px-4 py-2 mt-2 bg-[#FFC107] text-primary rounded-lg">proyecto</span></h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Estamos <b className="text-foreground">listos para ayudarte</b>. Déjanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold">Nombre completo</Label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold">Teléfono (Opcional)</Label>
                  <Input id="phone" type="tel" placeholder="Tu número de teléfono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-semibold">Mensaje</Label>
                  <Textarea id="message" placeholder="¿En qué podemos ayudarte?" rows={5} />
                </div>
                <Button type="submit" size="lg" className="w-full font-bold">
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline">Otras formas de <span className="text-primary">contactar</span></h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Teléfono</h3>
                        <p className="text-muted-foreground">Llámanos para una <b className="text-foreground">atención inmediata</b>.</p>
                        <a href="tel:+521234567890" className="text-primary font-semibold hover:underline">+52 123 456 7890</a>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Correo Electrónico</h3>
                        <p className="text-muted-foreground">Envíanos tus <b className="text-foreground">requerimientos y cotizaciones</b>.</p>
                        <a href="mailto:ventas@dfac.com" className="text-primary font-semibold hover:underline">ventas@dfac.com</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">WhatsApp</h3>
                        <p className="text-muted-foreground">El canal <b className="text-foreground">más rápido</b> para resolver dudas.</p>
                        <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Chatea con nosotros</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Oficina Central</h3>
                        <p className="text-muted-foreground">Av. de la Industria 123, Parque Industrial, Querétaro, Qro. CP 76150</p>
                        <p className="text-sm text-muted-foreground"><b className="text-foreground">Horario:</b> Lunes a Viernes de 9:00 a 18:00 hrs.</p>
                    </div>
                </div>
            </div>
             <div className="space-y-4">
                <h3 className="text-xl font-semibold">Síguenos en <span className="text-primary">redes</span></h3>
                <div className="flex space-x-4">
                    <Button asChild variant="outline" size="icon" className="text-muted-foreground hover:text-primary hover:border-primary">
                        <Link href="#"><Facebook /></Link>
                    </Button>
                     <Button asChild variant="outline" size="icon" className="text-muted-foreground hover:text-primary hover:border-primary">
                        <Link href="#"><Instagram /></Link>
                    </Button>
                     <Button asChild variant="outline" size="icon" className="text-muted-foreground hover:text-primary hover:border-primary">
                        <Link href="#"><Linkedin /></Link>
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

    