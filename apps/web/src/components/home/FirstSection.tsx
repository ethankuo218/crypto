import { animate, onScroll } from 'animejs';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import homeImg1 from '../../assets/home-img-1.png';
import AnimatedWaveLine from '../layout/AnimatedWaveLine';
import MarketNavPanel from '../market/MarketNavPanel';

const FirstSection: React.FC = () => {
  const navigate = useNavigate();

  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const waveLineRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const marketNavPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !textContainerRef.current ||
      !buttonRef.current ||
      !waveLineRef.current ||
      !imgRef.current ||
      !marketNavPanelRef.current
    )
      return;

    textContainerRef.current.style.transform = 'translateX(-100px)';
    textContainerRef.current.style.opacity = '0';

    buttonRef.current.style.transform = 'translateX(-100px)';
    buttonRef.current.style.opacity = '0';

    waveLineRef.current.style.opacity = '0';

    imgRef.current.style.transform = 'scale(0.2)';
    imgRef.current.style.opacity = '0';

    marketNavPanelRef.current.style.opacity = '0';

    const playEnterAnimation = () => {
      animate(textContainerRef.current!, {
        x: [{ to: 0, duration: 1000, easing: 'easeInOutQuad' }],
        opacity: [{ to: 1, duration: 1000, easing: 'linear' }],
        delay: 100,
      });

      animate(buttonRef.current!, {
        x: [{ to: 0, duration: 1000, easing: 'easeInOutQuad' }],
        opacity: [{ to: 1, duration: 1000, easing: 'linear' }],
        delay: 200,
      });

      animate(waveLineRef.current!, {
        opacity: [{ to: 1, duration: 1000, easing: 'linear' }],
        delay: 500,
      });

      animate(imgRef.current!, {
        scale: [{ to: 1, duration: 1000, easing: 'easeOutBack' }],
        opacity: [{ to: 1, duration: 1000, easing: 'linear' }],
        delay: 100,
      });

      animate(marketNavPanelRef.current!, {
        opacity: [{ to: 1, duration: 1000, easing: 'linear' }],
        delay: 300,
      });
    };

    const playLeaveAnimation = () => {
      animate(textContainerRef.current!, {
        x: [{ to: -100, duration: 1000, easing: 'easeInOutQuad' }],
        opacity: [{ to: 0, duration: 1000, easing: 'linear' }],
        delay: 0,
      });

      animate(buttonRef.current!, {
        x: [{ to: -100, duration: 1000, easing: 'easeInOutQuad' }],
        opacity: [{ to: 0, duration: 1000, easing: 'linear' }],
        delay: 0,
      });

      animate(waveLineRef.current!, {
        opacity: [{ to: 0, duration: 1000, easing: 'linear' }],
        delay: 0,
      });

      animate(imgRef.current!, {
        scale: [{ to: 0.2, duration: 1000, easing: 'easeOutBack' }],
        opacity: [{ to: 0, duration: 1000, easing: 'linear' }],
        delay: 0,
      });

      animate(marketNavPanelRef.current!, {
        opacity: [{ to: 0, duration: 1000, easing: 'linear' }],
        delay: 0,
      });
    };

    onScroll({
      target: sectionRef.current,
      enter: 'bottom top+=100',
      leave: 'top bottom-=200',
      onEnter: playEnterAnimation,
      onLeave: playLeaveAnimation,
    });
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col gap-10 pt-[80px]">
      <div className=" flex justify-between relative">
        <div className="max-w-[30vw] flex flex-col gap-6">
          <div ref={textContainerRef} className="flex flex-col gap-6">
            <h1 className="text-text-primary text-6xl font-bold">
              Buy & Sell Digital Assets In The Rocket
            </h1>

            <p className="text-text-secondary text-lg">
              Coin rocket is the easiest, safest, and fastest way to buy & sell crypto asset
              exchange.
            </p>
          </div>

          <button
            ref={buttonRef}
            className="bg-primary text-background text-[16px] leading-[16px] font-medium px-6 py-4 rounded-full max-w-[185px]"
            onClick={() => navigate('/market')}
          >
            Get Started Now
          </button>

          <div className="h-[110px]"></div>
        </div>

        <div className="max-w-[30vw]">
          <img ref={imgRef} className="w-full h-full" src={homeImg1} alt="home-img-1" />
        </div>

        <div ref={waveLineRef} className="absolute bottom-0 left-0 max-w-[900px]">
          <AnimatedWaveLine />
        </div>
      </div>

      <div ref={marketNavPanelRef}>
        <MarketNavPanel />
      </div>
    </section>
  );
};

export default FirstSection;
