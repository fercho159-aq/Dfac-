"use client";

import { useState } from 'react';
import Image from 'next/image';

export function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="aspect-square relative w-full overflow-hidden rounded-lg border cursor-zoom-in"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src || 'https://placehold.co/600x600.png'}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors z-50"
          >
            ✕
          </button>
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={src || 'https://placehold.co/600x600.png'}
              alt={alt}
              fill
              className="object-contain"
              sizes="90vw"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  );
}
