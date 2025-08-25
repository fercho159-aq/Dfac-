"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Truck, HardHat } from "lucide-react"
import { useState } from "react"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Productos" },
  { href: "/about", label: "Nosotros" },
  { href: "/#promociones", label: "Promociones" },
  { href: "/faq", label: "Preguntas frecuentes" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-foreground">
              <HardHat className="h-8 w-8 text-primary" />
              <span className="font-black">DFAC</span>
            </Link>
          </div>
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "text-[15px] font-medium transition-colors",
                  pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
             <div className="hidden sm:flex items-center space-x-2 bg-secondary px-3 py-2 rounded-full">
               <Truck className="h-6 w-6 text-primary animate-pulse" />
               <span className="text-sm font-semibold text-primary">Entrega en 24 horas</span>
             </div>
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/contact">Contáctenos</Link>
            </Button>
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-6 p-6">
                    <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-foreground" onClick={() => setIsOpen(false)}>
                      <HardHat className="h-8 w-8 text-primary" />
                      <span className="font-black">DFAC</span>
                    </Link>
                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <Link 
                          key={link.href} 
                          href={link.href} 
                          className={cn(
                            "text-[15px] font-medium transition-colors",
                            pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
                          )}
                          onClick={() => setIsOpen(false)}>
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                     <div className="flex sm:hidden items-center space-x-2 bg-secondary px-3 py-2 rounded-full">
                       <Truck className="h-6 w-6 text-primary animate-pulse" />
                       <span className="text-sm font-semibold text-primary">Entrega en 24 horas</span>
                     </div>
                    <Button asChild className="w-full">
                      <Link href="/contact" onClick={() => setIsOpen(false)}>Contáctenos</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
