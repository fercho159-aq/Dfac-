
"use client"
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import Link from 'next/link';
import { Button } from './ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export function FloatingActionButtons() {
  return (
    <TooltipProvider>
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href="https://wa.me/525564220884" target="_blank" rel="noopener noreferrer" onClick={() => { if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) { (window as any).gtag_report_conversion('https://wa.me/525564220884'); } }}>
                        <Button
                        size="icon"
                        className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 text-white shadow-lg"
                        aria-label="Chatear por WhatsApp"
                        >
                        <WhatsAppIcon className="h-7 w-7" />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>Chatear por WhatsApp</p>
                </TooltipContent>
            </Tooltip>
        
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href="tel:5525989751">
                        <Button
                        size="icon"
                        className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 text-white shadow-lg"
                        aria-label="Llamar por teléfono"
                        >
                        <Phone className="h-7 w-7" />
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>Llámanos ahora</p>
                </TooltipContent>
            </Tooltip>
        </div>
    </TooltipProvider>
  );
}
