
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

const faqCategories = [
  {
    category: "Sobre Nuestros Productos",
    questions: [
      {
        question: "¿Qué tipo de accesorios para cimbra y andamios ofrecen?",
        answer: "Ofrecemos una amplia gama de productos, incluyendo puntales metálicos, sistemas de anclaje, moños, cuñas, andamios estándar, plataformas, vigas y todo tipo de accesorios para garantizar la seguridad y eficiencia de tu obra."
      },
      {
        question: "¿Sus productos están certificados?",
        answer: "Sí, todos nuestros productos cumplen con los más altos estándares de calidad y seguridad de la industria. Están fabricados con materiales de alta resistencia para soportar las condiciones más exigentes en la construcción."
      },
      {
        question: "¿Ofrecen asesoría para elegir el material correcto?",
        answer: "¡Por supuesto! Nuestro equipo de expertos está disponible para brindarte asesoría técnica personalizada y ayudarte a seleccionar la solución más adecuada para las necesidades específicas de tu proyecto."
      }
    ]
  },
  {
    category: "Envíos y Entregas",
    questions: [
      {
        question: "¿Cuál es el tiempo de entrega?",
        answer: "Nuestra promesa es simple: garantizamos la entrega de tu material en menos de 24 horas en nuestra zona de cobertura principal. Para otras zonas, el tiempo puede variar ligeramente."
      },
      {
        question: "¿Cuál es el costo de envío?",
        answer: "El costo de envío depende del volumen de tu pedido y la ubicación de la obra. Al momento de realizar tu cotización, te proporcionaremos un desglose detallado de los costos de entrega."
      },
      {
        question: "¿Puedo rastrear mi pedido?",
        answer: "Sí, una vez confirmado tu pedido, te proporcionaremos información para que puedas estar al tanto del estado de tu entrega."
      }
    ]
  },
  {
    category: "Pagos y Facturación",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos transferencias bancarias, depósitos y pagos con tarjeta de crédito/débito. Consulta con tu asesor las opciones disponibles."
      },
      {
        question: "¿Puedo solicitar una factura?",
        answer: "Sí, emitimos facturas fiscales para todas tus compras. Solo necesitas proporcionar tus datos de facturación al momento de confirmar el pedido."
      }
    ]
  },
  {
    category: "Garantías y Devoluciones",
    questions: [
      {
        question: "¿Qué garantía tienen los productos?",
        answer: "Nuestros productos están garantizados contra defectos de fabricación. Si recibes un producto en mal estado, contáctanos de inmediato para gestionar el reemplazo."
      },
      {
        question: "¿Cómo puedo devolver un producto?",
        answer: "Para devoluciones, por favor contacta a nuestro equipo de atención al cliente dentro de los primeros 5 días hábiles después de recibir tu material. Se aplican ciertas condiciones. Para más detalles, puedes consultar nuestras Políticas de Devolución."
      }
    ]
  }
];

export default function FaqPage() {
  return (
    <>
      <div className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-headline">Preguntas <span className="text-primary">Frecuentes</span></h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Aquí encontrarás respuesta a las dudas más comunes sobre nuestros <b className="text-foreground">productos, envíos y servicios</b>. Queremos <b className="text-foreground">facilitar tu proceso</b> de compra.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${index}-${idx}`}>
                    <AccordionTrigger className="text-lg text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-primary text-primary-foreground p-10 rounded-lg">
            <h2 className="text-3xl font-bold font-headline">¿No encontraste tu <br/> <span className="inline-block px-4 py-2 mt-2 bg-[#FFC107]/75 text-background rounded-lg italic">respuesta?</span></h2>
            <p className="mt-2 text-lg text-primary-foreground/80">
                Nuestro equipo de <b className="text-white">expertos</b> está listo para ayudarte.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                    <Link href="/contact">
                        <MessageSquare className="mr-2 h-5 w-5" /> <b className="font-bold">Hablemos de tu proyecto</b>
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </>
  );
}
