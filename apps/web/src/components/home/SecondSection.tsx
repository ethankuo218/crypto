import { animate, onScroll } from 'animejs';
import { useEffect, useRef } from 'react';
import MarketListPanel from '../market/MarketListPanel';

const SecondSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial state
    sectionRef.current.style.transform = 'translateY(100px)';
    sectionRef.current.style.opacity = '0';

    const playEnterAnimation = () => {
      animate(sectionRef.current!, {
        y: [{ to: 0, duration: 1000, easing: 'easeInOutQuad' }],
        opacity: [{ to: 1, duration: 1000, easing: 'linear' }],
        delay: 0,
      });
    };

    const playLeaveAnimation = () => {
      animate(sectionRef.current!, {
        y: [{ to: 100, duration: 1000, easing: 'easeInOutQuad' }],
        opacity: [{ to: 0, duration: 1000, easing: 'linear' }],
        delay: 0,
      });
    };

    onScroll({
      target: sectionRef.current,
      enter: 'bottom top',
      leave: 'top bottom-=200',
      debug: true,
      onEnter: playEnterAnimation,
      onLeave: playLeaveAnimation,
    });
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-text-primary text-4xl font-bold">Market Update</h2>

        <a className=" text-text-primary text-[16px] leading-[16px] font-medium max-w-[185px] underline cursor-pointer">
          See All Coins
        </a>
      </div>

      <MarketListPanel />
    </section>
  );
};

export default SecondSection;
