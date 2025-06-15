import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animate, onScroll } from 'animejs';
import { useEffect, useRef } from 'react';
import homeImg4 from '../../assets/home-img-4.png';
import mobileImg1 from '../../assets/mobile-img-1.svg';
import mobileImg2 from '../../assets/mobile-img-2.svg';
import mobileImg3 from '../../assets/mobile-img-3.svg';

const SixthSection: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  const playImgEnterAnimation = () => {
    animate(imgRef.current!, {
      opacity: 1,
      scale: 1,
      duration: 1000,
      easing: 'easeOutCubic',
    });
  };

  const playImgLeaveAnimation = () => {
    animate(imgRef.current!, {
      opacity: 0.2,
      scale: 0,
      duration: 1000,
      easing: 'linear',
    });
  };

  const playTextEnterAnimation = () => {
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

    animate(item3Ref.current!, {
      x: 0,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 400,
    });

    animate(buttonContainerRef.current!, {
      x: 0,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 500,
    });
  };

  const playTextLeaveAnimation = () => {
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

    animate(item3Ref.current!, {
      x: 500,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 300,
    });

    animate(buttonContainerRef.current!, {
      x: 500,
      duration: 1000,
      easing: 'easeOutBack',
      delay: 500,
    });
  };

  useEffect(() => {
    onScroll({
      target: imgRef.current!,
      enter: 'bottom top',
      leave: 'top bottom',
      onEnter: playImgEnterAnimation,
      onLeave: playImgLeaveAnimation,
    });

    onScroll({
      target: textContainerRef.current!,
      enter: 'bottom top',
      leave: 'top bottom',
      onEnter: playTextEnterAnimation,
      onLeave: playTextLeaveAnimation,
    });
  }, []);

  return (
    <section className="grid grid-cols-3 gap-10 py-[80px]">
      <div className="flex items-center justify-center col-span-1 ">
        <img ref={imgRef} className="rounded-3xl overflow-hidden" src={homeImg4} alt="home-img-4" />
      </div>

      <div ref={textContainerRef} className="flex flex-col gap-6 col-span-2">
        <div ref={titleRef} className="flex flex-col gap-4">
          <h2 className="text-text-primary text-5xl font-bold">Trade & invest anytime,anywhere</h2>

          <p className="text-text-secondary text-xl">
            Our comprehensive reports are designed to provide you with a detailed analysis of your
            cryptocurrency portfolio. Our team of experts carefully evaluates each of your
            investments and provides you with recommendations to help you optimize your returns
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div ref={item1Ref} className="flex gap-6">
            <div className="h-full w-[50px] rounded-full flex items-center justify-center">
              <img src={mobileImg1} alt="mobile-img-1" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-text-primary text-2xl font-medium">Verify your identity</h3>

              <p className="text-text-secondary text-base">
                Complete the identity verification process to secure your Account and transactions.
              </p>
            </div>
          </div>

          <div ref={item2Ref} className="flex gap-6">
            <div className="h-full w-[50px] rounded-full flex items-center justify-center">
              <img src={mobileImg2} alt="mobile-img-2" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-text-primary text-2xl font-medium">Fund your Account</h3>

              <p className="text-text-secondary text-base">
                Add funds to your crypto account to start trading crypto. Add funds with variety of
                Payment methods
              </p>
            </div>
          </div>

          <div ref={item3Ref} className="flex gap-6">
            <div className="h-full w-[50px] rounded-full flex items-center justify-center">
              <img src={mobileImg3} alt="mobile-img-3" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-text-primary text-2xl font-medium">Start trading</h3>

              <p className="text-text-secondary text-base">
                You are good to go! Buy/sell crypto, set up recurring buys for your investments, and
                discover what Binance has to offer.
              </p>
            </div>
          </div>
        </div>

        <div ref={buttonContainerRef} className="flex gap-6">
          <button className="flex gap-2 bg-[#0C0C0C] text-text-primary p-4 rounded-2xl max-w-[190px] border border-[#3F4555] items-center">
            <FontAwesomeIcon icon={faApple} className="text-text-primary text-[35px]" />

            <div className="flex flex-col gap-2 items-start">
              <p className="text-text-primary text-[12px] leading-[15px]">Download on the</p>
              <p className="text-text-primary text-[16px] leading-[19px] font-bold">App Store</p>
            </div>
          </button>

          <button className="flex gap-2 bg-[#0C0C0C] text-text-primary p-4 rounded-2xl max-w-[190px] border border-[#3F4555] items-center">
            <FontAwesomeIcon icon={faGooglePlay} className="text-text-primary text-[30px]" />

            <div className="flex flex-col gap-2 items-start">
              <p className="text-text-primary text-[12px] leading-[15px]">Download on the</p>
              <p className="text-text-primary text-[16px] leading-[19px] font-bold">Google Play</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SixthSection;
