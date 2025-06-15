import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animate, onScroll } from 'animejs';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import homeImg3 from '../../assets/home-img-3.png';

const ForthSection: React.FC = () => {
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);

  const playEnterAnimation = () => {
    animate(imgRef.current!, {
      opacity: 1,
      scale: 1,
      duration: 1000,
      easing: 'easeOutCubic',
    });
  };

  const playLeaveAnimation = () => {
    animate(imgRef.current!, {
      opacity: 0.2,
      scale: 0,
      duration: 1000,
      easing: 'linear',
    });
  };

  useEffect(() => {
    onScroll({
      target: imgRef.current!,
      enter: 'bottom top',
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
        <div className="flex flex-col gap-4">
          <h2 className="text-text-primary text-5xl font-bold">What Is Rockie</h2>
          <p className="text-text-secondary text-xl">
            Experience a variety of trading on Bitcost. You can use various types of coin
            transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining, and margin.
          </p>
        </div>

        <div className="flex gap-4">
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

        <div className="flex gap-4">
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
