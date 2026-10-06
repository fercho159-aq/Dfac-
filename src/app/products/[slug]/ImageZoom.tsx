"use client";

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

export function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  const imgSrc = src || 'https://placehold.co/600x600.png';

  return (
    <div
      ref={containerRef}
      className="aspect-square relative w-full overflow-hidden rounded-lg border cursor-crosshair"
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setShowZoom(true)}
      onTouchEnd={() => setShowZoom(false)}
      onTouchMove={handleTouchMove}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
        draggable={false}
      />
      {showZoom && (
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: '250%',
            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
}
