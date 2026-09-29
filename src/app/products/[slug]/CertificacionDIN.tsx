'use client';

import { useState } from 'react';

export function CertificacionDIN() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-gradient-to-r from-green-700 via-white to-red-600 p-[2px] rounded-xl mb-6 w-full hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex items-center gap-3 bg-white rounded-[10px] px-4 py-3 w-full">
          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-green-700 flex items-center justify-center bg-white">
            <svg viewBox="0 0 36 36" className="w-8 h-8">
              <rect x="0" y="0" width="12" height="36" fill="#009246" />
              <rect x="12" y="0" width="12" height="36" fill="#fff" />
              <rect x="24" y="0" width="12" height="36" fill="#CE2B37" />
            </svg>
          </div>
          <div className="text-left">
            <span className="text-sm md:text-base font-bold text-slate-800">
              Puntales certificados según la norma DIN EN 1065
            </span>
            <span className="block text-xs text-blue-600 font-medium">Haz clic para más información</span>
          </div>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-2xl leading-none cursor-pointer"
            >
              ×
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-700 flex items-center justify-center bg-white flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-9 h-9">
                  <rect x="0" y="0" width="12" height="36" fill="#009246" />
                  <rect x="12" y="0" width="12" height="36" fill="#fff" />
                  <rect x="24" y="0" width="12" height="36" fill="#CE2B37" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Certificación DIN EN 1065</h3>
            </div>

            <div className="space-y-3 text-sm md:text-base text-slate-700">
              <p>
                La certificación DIN EN 1065 es expedida por el instituto de ensayos de materiales de la Universidad de Stuttgart, lo que garantiza el pleno cumplimiento de las normas europeas e internacionales.
              </p>
              <p className="font-semibold text-slate-800">Los puntales cumplen requisitos rigurosos en cuanto a:</p>
              <ul className="space-y-2 pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Materias primas de alta calidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Diseño y fabricación según normas industriales avanzadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Control de calidad completo en cada fase</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Seguridad operativa y protección contra la corrosión</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
