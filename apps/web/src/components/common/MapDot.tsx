import { animate } from 'animejs';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface MapDotRef {
  trigger: () => void;
  reset: () => void;
}

const MapDot = forwardRef<MapDotRef, { x: number; y: number }>(({ x, y }, ref) => {
  // Random size for the lighter blue layer (14px to 18px)
  const lightSize = Math.floor(Math.random() * (18 - 14 + 1)) + 14;
  const scaleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      trigger: () => {
        if (!scaleRef.current || !dotRef.current) return;
        // Step 1: Deep blue dot fades in
        animate(dotRef.current, {
          opacity: [0, 1],
          duration: 400,
          easing: 'linear',
          onComplete: () => {
            // Step 2: Lighter blue layer pulses
            animate(scaleRef.current!, {
              opacity: [0, 1],
              scale: [0, 1],
              duration: 600,
              easing: 'easeOutBack',
            });
            // Step 3: Lighter blue layer appears (scale and fade in)
            animate(scaleRef.current!, {
              scale: [1, 1.2, 1],
              opacity: [1, 0.6, 1],
              duration: 1200,
              direction: 'alternate',
              loop: true,
              easing: 'easeInOutSine',
            });
          },
          delay: 500,
        });
      },

      reset: () => {
        if (!scaleRef.current || !dotRef.current) return;
        scaleRef.current.style.opacity = '0';
        dotRef.current.style.opacity = '0';
      },
    }),
    []
  );

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ top: `${y}%`, left: `${x}%`, transform: 'translate(-50%, -50%)' }}
    >
      <div
        ref={scaleRef}
        className="absolute bg-[#00C4F4]/30 rounded-full shadow-lg"
        style={{ width: lightSize, height: lightSize, opacity: 0 }}
      />
      <div
        ref={dotRef}
        className="absolute w-2 h-2 bg-[#00C4F4] rounded-full shadow-lg"
        style={{ opacity: 0 }}
      />
    </div>
  );
});

MapDot.displayName = 'MapDot';

export default MapDot;
