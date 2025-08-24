
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
          <h1 className="text-4xl md:text-5xl font-black font-headline">Hablemos de tu proyecto</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Estamos listos para ayudarte. Déjanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (Opcional)</Label>
                  <Input id="phone" type="tel" placeholder="Tu número de teléfono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea id="message" placeholder="¿En qué podemos ayudarte?" rows={5} />
                </div>
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline">Otras formas de contactar</h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Teléfono</h3>
                        <p className="text-muted-foreground">Llámanos para una atención inmediata.</p>
                        <a href="tel:+521234567890" className="text-primary font-semibold hover:underline">+52 123 456 7890</a>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Correo Electrónico</h3>
                        <p className="text-muted-foreground">Envíanos tus requerimientos y cotizaciones.</p>
                        <a href="mailto:ventas@dfac.com" className="text-primary font-semibold hover:underline">ventas@dfac.com</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">WhatsApp</h3>
                        <p className="text-muted-foreground">El canal más rápido para resolver dudas.</p>
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
                        <p className="text-sm text-muted-foreground">Horario: Lunes a Viernes de 9:00 a 18:00 hrs.</p>
                    </div>
                </div>
            </div>
             <div className="space-y-4">
                <h3 className="text-xl font-semibold">Síguenos en redes</h3>
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
