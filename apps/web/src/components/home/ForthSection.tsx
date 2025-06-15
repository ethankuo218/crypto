import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animate, onScroll } from 'animejs';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import homeImg3 from '../../assets/home-img-3.png';

const ForthSection: React.FC = () => {
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const playEnterAnimation = () => {
    animate(imgRef.current!, {
      opacity: 1,
      scale: 1,
      duration: 1000,
      easing: 'easeOutCubic',
    });

    animate(titleRef.current!, {
      x: 0,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 100,
    });

    animate(item1Ref.current!, {
      x: 0,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 200,
    });

    animate(item2Ref.current!, {
      x: 0,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 300,
    });

    animate(buttonRef.current!, {
      x: 0,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 400,
    });
  };

  const playLeaveAnimation = () => {
    animate(imgRef.current!, {
      opacity: 0.2,
      scale: 0,
      duration: 1000,
      easing: 'linear',
    });

    animate(titleRef.current!, {
      x: 500,
      duration: 1000,
      easing: 'easeOutBack',
    });

    animate(item1Ref.current!, {
      x: 500,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 100,
    });

    animate(item2Ref.current!, {
      x: 500,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 200,
    });

    animate(buttonRef.current!, {
      x: 500,
      duration: 1000,
      easing: 'easeOutBack',
    });

    animate(buttonRef.current!, {
      x: 500,
      duration: 1000,
      easing: 'easeOutBack',
    });
  };

  useEffect(() => {
    onScroll({
      target: imgRef.current!,
      enter: 'bottom top+=100',
      leave: 'top bottom',
      onEnter: playEnterAnimation,
      onLeave: playLeaveAnimation,
    });
  }, []);

  return (
    <section className="flex gap-10 py-[80px]">
      <div className="flex-1">
        {/* Carousel */}
        <img ref={imgRef} src={homeImg3} alt="home-img-3" />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div ref={titleRef} className="flex flex-col gap-4">
          <h2 className="text-text-primary text-5xl font-bold">What Is Rockie</h2>
          <p className="text-text-secondary text-xl">
            Experience a variety of trading on Bitcost. You can use various types of coin
            transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining, and margin.
          </p>
        </div>

        <div ref={item1Ref} className="flex gap-4">
          <div className="h-8 flex items-center justify-center">
            <FontAwesomeIcon icon={faCircleCheck} className="text-primary text-xl" />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-text-primary text-2xl font-medium">
              View real-time cryptocurrency prices
            </h3>

            <p className="text-text-secondary text-base">
              Experience a variety of trading on Bitcost. You can use various types of coin
              transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining, and margin.
            </p>
          </div>
        </div>

        <div ref={item2Ref} className="flex gap-4">
          <div className="h-8 flex items-center justify-center">
            <FontAwesomeIcon icon={faCircleCheck} className="text-primary text-xl" />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-text-primary text-2xl font-medium">
              Buy and sell BTC, ETH, XRP, OKB, Etc...
            </h3>

            <p className="text-text-secondary text-base">
              Experience a variety of trading on Bitcost. You can use various types of coin
              transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining, and margin.
            </p>
          </div>
        </div>

        <button
          ref={buttonRef}
          className="bg-primary text-background text-[16px] leading-[16px] font-medium px-6 py-4 rounded-full max-w-[185px]"
          onClick={() => navigate('/market')}
        >
          Explore More
        </button>
      </div>
    </section>
  );
};

export default ForthSection;
