import { Facebook, Instagram } from 'lucide-react';

const btn = 'w-12 h-12 rounded-full text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform';

export function SocialVideoLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-sm font-semibold text-muted-foreground mb-4">Síguenos en redes sociales</p>
      <div className="flex items-center justify-center gap-5">
        <a href="https://www.tiktok.com/@accesorios.dfac?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="TikTok de DFAC" title="TikTok" className={`${btn} bg-black`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
        </a>
        <a href="https://www.facebook.com/bandasdepvcymonosparacimbra" target="_blank" rel="noopener noreferrer" aria-label="Facebook de DFAC" title="Facebook" className={`${btn} bg-[#1877F2]`}>
          <Facebook className="w-6 h-6" aria-hidden="true" />
        </a>
        <a href="https://www.instagram.com/dfac_cimbra?rpxt=a3k4NWJhNDVnMXM2" target="_blank" rel="noopener noreferrer" aria-label="Instagram de DFAC" title="Instagram" className={`${btn} bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]`}>
          <Instagram className="w-6 h-6" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
