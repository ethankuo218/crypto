import { createTimeline } from 'animejs';
import React, { useEffect, useRef } from 'react';
import logoBottomLeft from '../assets/logo-bottom-left.svg';
import logoMain from '../assets/logo-main.svg';
import logoTopRight from '../assets/logo-top-right.svg';

const Welcome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLImageElement>(null);
  const bottomLeftRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !spinnerRef.current ||
      !topRightRef.current ||
      !bottomLeftRef.current ||
      !titleRef.current
    )
      return;

    const timeline = createTimeline({
      defaults: {
        duration: 2000,
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
      )
      .add(
        titleRef.current,
        {
          opacity: [{ to: 1, duration: 1000 }],
        },
        2000
      )
      .add(
        containerRef.current,
        {
          opacity: [{ to: 0, duration: 500 }],
        },
        3000
      );

    return () => {
      timeline.pause();
    };
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div ref={containerRef} className="flex flex-col items-center">
        <div ref={spinnerRef} className="relative w-[100px] h-[100px]">
          <img className="absolute w-[100px] h-[100px]" src={logoMain} alt="logo" />
          <img
            ref={topRightRef}
            className="absolute w-[100px] h-[100px]"
            src={logoTopRight}
            alt="logo"
          />
          <img
            ref={bottomLeftRef}
            className="absolute w-[100px] h-[100px]"
            src={logoBottomLeft}
            alt="logo"
          />
        </div>

        <h1 ref={titleRef} className="text-text-primary text-[64px] font-bold opacity-0">
          Crypto
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
