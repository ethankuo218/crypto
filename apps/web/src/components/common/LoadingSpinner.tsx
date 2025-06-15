import { createTimeline } from 'animejs';
import React, { useEffect, useRef } from 'react';
import logoBottomLeft from '../../assets/logo-bottom-left.svg';
import logoMain from '../../assets/logo-main.svg';
import logoTopRight from '../../assets/logo-top-right.svg';

const LoadingSpinner: React.FC = () => {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLImageElement>(null);
  const bottomLeftRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!spinnerRef.current || !topRightRef.current || !bottomLeftRef.current) return;

    const timeline = createTimeline({
      defaults: {
        duration: 2000,
        loop: true,
        loopDelay: 250,
      },
    });

    timeline
      .add(spinnerRef.current, {
        rotate: 360,
        filter: [
          { to: 'blur(5px)', duration: 1000 },
          { to: 'blur(0px)', duration: 1000 },
        ],
      })
      .add(
        topRightRef.current,
        {
          x: [
            { to: 10, duration: 1000 },
            { to: 0, duration: 1000 },
          ],
          y: [
            { to: -10, duration: 1000 },
            { to: 0, duration: 1000 },
          ],
        },
        0
      )
      .add(
        bottomLeftRef.current,
        {
          x: [
            { to: -10, duration: 1000 },
            { to: 0, duration: 1000 },
          ],
          y: [
            { to: 10, duration: 1000 },
            { to: 0, duration: 1000 },
          ],
        },
        0
      );

    return () => {
      timeline.pause();
    };
  }, []);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{ willChange: 'filter' }}
    >
      <div ref={spinnerRef} className="relative w-[50px] h-[50px]">
        <img className="absolute w-[50px] h-[50px]" src={logoMain} alt="logo" />
        <img
          ref={topRightRef}
          className="absolute w-[50px] h-[50px]"
          src={logoTopRight}
          alt="logo"
        />
        <img
          ref={bottomLeftRef}
          className="absolute w-[50px] h-[50px]"
          src={logoBottomLeft}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
