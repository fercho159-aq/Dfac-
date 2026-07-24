"use client";

import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

export function WhatsAppButton({ url }: { url: string }) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion(url);
    }
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      <Button size="lg" variant="secondary" className="w-full bg-green-500 hover:bg-green-600 text-white">
        <WhatsAppIcon className="mr-2 h-5 w-5" /> Para entregas urgentes envíanos un WhatsApp
      </Button>
    </a>
  );
}
