import Link from "next/link"
import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/">
              <Image src="/logo.png" alt="DFAC Logo" width={120} height={40} data-ai-hint="logo" />
            </Link>
            <p className="text-muted-foreground">Accesorios para cimbra de alta calidad. Tu socio en construcción.</p>
            <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Navegación</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Productos</Link></li>
              <li><Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors">Catálogo</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Nosotros</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">Preguntas frecuentes</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Contacto</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start space-x-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:5525989751" className="hover:text-primary transition-colors">01 (55) 2598-9751</a>
                  <a href="tel:5541673745" className="hover:text-primary transition-colors">01 (55) 4167-3745</a>
                  <a href="tel:5555715084" className="hover:text-primary transition-colors">01 (55) 5571-5084</a>
                </div>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:ventas@cimbrayaccesorios.com.mx" className="hover:text-primary transition-colors">ventas@cimbrayaccesorios.com.mx</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Términos de Servicio</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DFAC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
