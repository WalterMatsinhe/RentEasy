import React, { useState, useEffect, useRef, HTMLAttributes, useCallback } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 420, autoRotateSpeed = 3000, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragDelta, setDragDelta] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dragStartXRef = useRef(0);
    const n = items.length;
    const anglePerItem = 360 / n;

    // Final rotation: snap to currentIndex + drag offset
    const snapRotation = -currentIndex * anglePerItem;
    const rotation = snapRotation + (isDragging ? dragDelta * 0.3 : 0);

    // Navigate to index with bounds wrapping
    const goTo = useCallback((index: number, fromUser = false) => {
      setCurrentIndex(((index % n) + n) % n);
      if (fromUser) {
        setUserInteracted(true);
        if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
        interactionTimerRef.current = setTimeout(() => setUserInteracted(false), 4000);
      }
    }, [n]);

    const goNext = useCallback((fromUser = false) => goTo(currentIndex + 1, fromUser), [currentIndex, goTo]);
    const goPrev = useCallback((fromUser = false) => goTo(currentIndex - 1, fromUser), [currentIndex, goTo]);

    // Auto-rotation
    useEffect(() => {
      if (!autoRotateSpeed || userInteracted || isDragging) return;
      const interval = setInterval(() => goNext(), autoRotateSpeed);
      return () => clearInterval(interval);
    }, [autoRotateSpeed, userInteracted, isDragging, goNext]);

    // Keyboard arrow keys
    useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }, [goNext, goPrev]);

    // --- Mouse drag ---
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      dragStartXRef.current = e.clientX;
      setDragDelta(0);
      e.preventDefault();
    };
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      setDragDelta(e.clientX - dragStartXRef.current);
    };
    const handleMouseUp = () => {
      if (!isDragging) return;
      const steps = Math.round(-dragDelta * 0.3 / anglePerItem);
      goTo(currentIndex + steps, true);
      setDragDelta(0);
      setIsDragging(false);
    };

    // --- Touch drag ---
    const handleTouchStart = (e: React.TouchEvent) => {
      setIsDragging(true);
      dragStartXRef.current = e.touches[0].clientX;
      setDragDelta(0);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging) return;
      setDragDelta(e.touches[0].clientX - dragStartXRef.current);
    };
    const handleTouchEnd = () => {
      if (!isDragging) return;
      const steps = Math.round(-dragDelta * 0.3 / anglePerItem);
      goTo(currentIndex + steps, true);
      setDragDelta(0);
      setIsDragging(false);
    };

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center select-none outline-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          className
        )}
        tabIndex={0}
        style={{ perspective: '1400px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {/* Top hint bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/25 backdrop-blur-sm text-white/80 text-xs font-medium px-4 py-2 rounded-full">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M9 5l7 7-7 7" />
            </svg>
            Use arrows or drag
          </div>
          {/* Image counter */}
          <div className="bg-[#264559] text-white text-xs font-bold px-3 py-2 rounded-full shadow">
            {currentIndex + 1} / {n}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(true); }}
          onMouseDown={e => e.stopPropagation()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white hover:bg-[#E5E642] text-[#264559] rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); goNext(true); }}
          onMouseDown={e => e.stopPropagation()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white hover:bg-[#E5E642] text-[#264559] rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-none">
          {items.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-6 h-2.5 bg-[#E5E642]'
                  : 'w-2.5 h-2.5 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* 3D Stage */}
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            // How far this item is from front (0 = centered)
            const effectiveAngle = ((itemAngle + rotation) % 360 + 360) % 360;
            const diff = effectiveAngle > 180 ? 360 - effectiveAngle : effectiveAngle;
            const isCurrent = i === currentIndex;
            const opacity = Math.max(0.2, 1 - diff / 160);
            const scale = isCurrent ? 1.08 : Math.max(0.85, 1 - diff / 400);

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute w-[280px] h-[370px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-140px',
                  marginTop: '-185px',
                  opacity,
                  transition: isDragging ? 'opacity 0.1s' : 'opacity 0.3s, transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
                  pointerEvents: 'none',
                  zIndex: isCurrent ? 10 : 1,
                }}
              >
                <div className={cn(
                  "relative w-full h-full rounded-2xl shadow-2xl overflow-hidden border-2 backdrop-blur-lg transition-all duration-300",
                  isCurrent ? "border-[#E5E642] shadow-[0_0_30px_rgba(229,230,66,0.25)]" : "border-white/10"
                )}>
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                    draggable={false}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/85 to-transparent text-white">
                    <h2 className="text-base font-bold leading-tight">{item.common}</h2>
                    <em className="text-xs italic opacity-70">{item.binomial}</em>
                    <p className="text-xs mt-1 opacity-50">📷 {item.photo.by}</p>
                  </div>
                  {/* Active badge */}
                  {isCurrent && (
                    <div className="absolute top-3 right-3 bg-[#E5E642] text-[#264559] text-[10px] font-bold px-2 py-1 rounded-full shadow">
                      ★ Active
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
