"use client";

import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export function WhatsAppButton({ url }: { url: string }) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion(url);
    }
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      <Button size="lg" variant="secondary" className="w-full bg-green-500 hover:bg-green-600 text-white">
        <MessageSquare className="mr-2 h-5 w-5" /> Para entregas urgentes envíanos un WhatsApp
      </Button>
    </a>
  );
}
