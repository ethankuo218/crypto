import { createTimeline } from 'animejs';
import React, { useEffect, useRef } from 'react';

const AnimatedWaveLine: React.FC = () => {
  const stop1 = useRef<SVGStopElement>(null);
  const stop2 = useRef<SVGStopElement>(null);
  const stop3 = useRef<SVGStopElement>(null);
  const stop4 = useRef<SVGStopElement>(null);
  const stop5 = useRef<SVGStopElement>(null);

  useEffect(() => {
    if (!stop1.current || !stop2.current || !stop3.current || !stop4.current || !stop5.current)
      return;

    const timeline = createTimeline({
      defaults: {
        duration: 2000,
        loop: true,
        loopDelay: 0,
      },
    });

    timeline
      .add(
        stop1.current,
        {
          stopColor: [
            { to: '#FF59F8', duration: 200 },
            { to: '#FFEE00', duration: 400 },
            { to: '#5CD167', duration: 400 },
            { to: '#00EFDF', duration: 400 },
            { to: '#AE72FF', duration: 400 },
            { to: '#FF59F8', duration: 200 },
          ],
          direction: 'normal',
        },
        0
      )
      .add(
        stop2.current,
        {
          stopColor: [
            { to: '#AE72FF', duration: 200 },
            { to: '#FF59F8', duration: 400 },
            { to: '#FFEE00', duration: 400 },
            { to: '#5CD167', duration: 400 },
            { to: '#00EFDF', duration: 400 },
            { to: '#AE72FF', duration: 200 },
          ],
          direction: 'normal',
        },
        0
      )
      .add(
        stop3.current,
        {
          stopColor: [
            { to: '#00EFDF', duration: 200 },
            { to: '#AE72FF', duration: 400 },
            { to: '#FF59F8', duration: 400 },
            { to: '#FFEE00', duration: 400 },
            { to: '#5CD167', duration: 400 },
            { to: '#00EFDF', duration: 200 },
          ],
          direction: 'normal',
        },
        0
      )
      .add(
        stop4.current,
        {
          stopColor: [
            { to: '#5CD167', duration: 200 },
            { to: '#00EFDF', duration: 400 },
            { to: '#AE72FF', duration: 400 },
            { to: '#FF59F8', duration: 400 },
            { to: '#FFEE00', duration: 400 },
            { to: '#5CD167', duration: 200 },
          ],
          direction: 'normal',
        },
        0
      )
      .add(
        stop5.current,
        {
          stopColor: [
            { to: '#FFEE00', duration: 200 },
            { to: '#5CD167', duration: 400 },
            { to: '#00EFDF', duration: 400 },
            { to: '#AE72FF', duration: 400 },
            { to: '#FF59F8', duration: 400 },
            { to: '#FFEE00', duration: 200 },
          ],
          direction: 'normal',
        },
        0
      );

    return () => {
      timeline.pause();
    };
  }, []);

  return (
    <svg
      width="100%"
      height="97"
      viewBox="0 0 905 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient
          id="paint0_linear_3_1702"
          x1="10.5939"
          y1="84.0072"
          x2="911.74"
          y2="59.331"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF59F8" stopOpacity="0" ref={stop1} />
          <stop offset="0.25" stopColor="#AE72FF" ref={stop2} />
          <stop offset="0.5" stopColor="#00EFDF" ref={stop3} />
          <stop offset="0.75" stopColor="#5CD167" ref={stop4} />
          <stop offset="1" stopColor="#FFEE00" stopOpacity="0" ref={stop5} />
        </linearGradient>
      </defs>
      <path
        d="M904.5 69.5C859.917 48.9515 806.581 95.2036 739 95.7802C671.419 96.3568 655.639 26.617 602.026 30.6265C549.627 34.5452 496.222 100.269 443.446 95.7802C390.669 91.291 369.517 18.6372 273.578 53.1797C177.64 87.7222 177.15 18.6117 108.79 3.56263C40.4291 -11.4864 1 44.6596 1 44.6596"
        stroke="url(#paint0_linear_3_1702)"
        strokeOpacity="1"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default AnimatedWaveLine;
