
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ContactSection() {
    const isMobile = useIsMobile();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={cn(
                "grid gap-12",
                !isMobile && "md:grid-cols-2"
            )}>
            
            {/* Contact Form - Hidden on mobile */}
            {!isMobile && (
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
            )}

            {/* Contact Info */}
            <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold font-headline">Otras formas de <span className="text-primary">contactar</span></h2>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">Teléfonos</h3>
                            <p className="text-muted-foreground">Llámanos para una <b className="text-foreground">atención inmediata</b>.</p>
                            <div className="flex flex-col space-y-1 mt-1">
                                <a href="tel:5525989751" className="text-primary font-semibold hover:underline">01 (55) 2598-9751</a>
                                <a href="tel:5541673745" className="text-primary font-semibold hover:underline">01 (55) 4167-3745</a>
                                <a href="tel:5555715084" className="text-primary font-semibold hover:underline">01 (55) 5571-5084</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">Correo Electrónico</h3>
                            <p className="text-muted-foreground">Envíanos tus <b className="text-foreground">requerimientos y cotizaciones</b>.</p>
                            <a href="mailto:ventas@dfac.com" className="text-primary font-semibold hover:underline">ventas@dfac.com</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">WhatsApp</h3>
                            <p className="text-muted-foreground">El canal <b className="text-foreground">más rápido</b> para resolver dudas.</p>
                            <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Chatea con nosotros</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">Oficina Central</h3>
                            <p className="text-muted-foreground">Cuauhtémoc 105, San Pedro Iztacalco, Iztacalco, 08220 Ciudad de México, CDMX</p>
                            <p className="text-sm text-muted-foreground"><b className="text-foreground">Horario:</b> Lunes a Viernes de 9:00 a 18:00 hrs.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold">Síguenos en <span className="text-primary">redes</span></h3>
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
    );
}
