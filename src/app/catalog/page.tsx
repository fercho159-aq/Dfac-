
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function CatalogPage() {
  const pdfUrl = "/catalog.pdf";

  return (
    <>
      <div className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-headline">Nuestro <span className="text-primary">Catálogo</span> Completo</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explora nuestra gama completa de <b className="text-foreground">soluciones y productos</b> para la construcción.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={pdfUrl} download="DFAC_Catalogo.pdf">
                <Download className="mr-2 h-5 w-5" />
                Descargar Catálogo
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-background p-4 sm:p-8 rounded-lg shadow-2xl border">
           <div className="aspect-w-16 aspect-h-9" style={{height: 'calc(100vh - 200px)'}}>
             <iframe
                src={pdfUrl}
                title="Catálogo de Productos DFAC"
                className="w-full h-full border-0 rounded-md"
              />
           </div>
        </div>
      </div>
    </>
  );
}
