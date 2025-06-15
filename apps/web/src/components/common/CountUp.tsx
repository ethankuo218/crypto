import { animate } from 'animejs';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export interface CountUpRef {
  start: () => void;
}

const CountUp = forwardRef<CountUpRef, CountUpProps>(
  ({ to, duration = 1200, className = '', suffix = '' }, forwardedRef) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);

    useImperativeHandle(forwardedRef, () => ({
      start: () => {
        if (!elementRef.current) return;

        let count = 0;
        animationRef.current = animate(elementRef.current, {
          innerText: [0, to],
          duration,
          round: 1,
          easing: 'easeOutCubic',
          onUpdate: () => {
            if (elementRef.current) {
              elementRef.current.innerHTML = count.toString() + suffix;
              count++;
            }
          },
          onComplete: () => {
            if (elementRef.current) {
              elementRef.current.innerHTML = to.toString() + suffix;
            }
          },
        });
      },
    }));

    return (
      <>
        <div ref={elementRef} className={`counter ${className}`} data-count={to}>
          0{suffix}
        </div>
      </>
    );
  }
);

CountUp.displayName = 'CountUp';

export default CountUp;
