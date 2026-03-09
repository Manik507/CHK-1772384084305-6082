import React from 'react';
import { Camera, Info, Scan, Zap } from 'lucide-react';

export default function ScannerPage() {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-brand-light to-brand-dark rounded-2xl shadow-lg shadow-brand/20">
          <Scan className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">Scan Medicine</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1 font-medium flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            AI-powered label recognition
          </p>
        </div>
      </div>

      <div className="premium-glass rounded-3xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors pointer-events-none"></div>
        <div className="aspect-video bg-[var(--bg-secondary)] flex flex-col items-center justify-center gap-4 relative overflow-hidden">
          {/* Scanning animation overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/20 to-transparent w-full h-1/2 animate-float opacity-50 blur-lg pointer-events-none"></div>
          
          <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-brand/50 rounded-3xl relative z-10 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand rounded-tl-xl shadow-[inset_0_0_20px_rgba(99,102,241,0.5)]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand rounded-tr-xl shadow-[inset_0_0_20px_rgba(99,102,241,0.5)]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand rounded-bl-xl shadow-[inset_0_0_20px_rgba(99,102,241,0.5)]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand rounded-br-xl shadow-[inset_0_0_20px_rgba(99,102,241,0.5)]" />
          </div>
          <Camera className="w-10 h-10 text-[var(--text-secondary)] absolute bottom-8 opacity-50" />
        </div>

        <div className="p-6 md:p-8 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
          <button className="w-full btn-premium py-4 transition-all flex items-center justify-center gap-3 text-lg">
            <Scan className="w-6 h-6" />
            Initialize Scanner
          </button>
        </div>
      </div>

      <div className="flex gap-4 p-5 premium-glass rounded-2xl relative overflow-hidden bg-brand/5 border-brand/20">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand to-accent"></div>
        <Info className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-[var(--text-primary)] mb-1">Scanning Tips</h4>
          <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
            Ensure adequate lighting and hold the camera steady. Point it directly at the medication barcode or the clearest part of the text label. Requires browser camera permissions.
          </p>
        </div>
      </div>
    </div>
  );
}
