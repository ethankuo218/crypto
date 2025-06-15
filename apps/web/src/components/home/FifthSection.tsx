import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animate, onScroll } from 'animejs';
import { useEffect, useRef } from 'react';
import homeFeatureImg1 from '../../assets/home-feature-img-1.svg';
import homeFeatureImg2 from '../../assets/home-feature-img-2.svg';
import homeFeatureImg3 from '../../assets/home-feature-img-3.svg';
import homeFeatureImg4 from '../../assets/home-feature-img-4.svg';

const FifthSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const cardRef4 = useRef<HTMLDivElement>(null);

  const playEnterAnimation = () => {
    animate(cardRef1.current!, {
      x: 0,
      opacity: 1,
      duration: 1000,
      easing: 'easeOutCubic',
      delay: 800,
    });

    animate(cardRef2.current!, {
      x: 0,
      opacity: 1,
      duration: 1000,
      easing: 'easeOutCubic',
    });

    animate(cardRef3.current!, {
      x: 0,
      opacity: 1,
      duration: 1000,
      easing: 'easeOutCubic',
    });

    animate(cardRef4.current!, {
      x: 0,
      opacity: 1,
      duration: 1000,
      easing: 'easeOutCubic',
      delay: 800,
    });
  };

  const playLeaveAnimation = () => {
    animate(cardRef1.current!, {
      x: -500,
      opacity: 0.2,
      duration: 1000,
      easing: 'linear',
    });

    animate(cardRef2.current!, {
      x: -500,
      opacity: 0.2,
      duration: 1000,
      easing: 'linear',
      delay: 800,
    });

    animate(cardRef3.current!, {
      x: 500,
      opacity: 0.2,
      duration: 1000,
      easing: 'linear',
      delay: 800,
    });

    animate(cardRef4.current!, {
      x: 500,
      opacity: 0.2,
      duration: 1000,
      easing: 'linear',
    });
  };

  useEffect(() => {
    onScroll({
      target: sectionRef.current!,
      enter: 'bottom top',
      leave: 'top bottom',
      onEnter: playEnterAnimation,
      onLeave: playLeaveAnimation,
    });
  }, []);
  return (
    <section ref={sectionRef} className="flex flex-col gap-10 py-[80px]">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-text-primary text-5xl font-bold">
          CryptoCap Amazing Faetures
        </h2>
        <p className="text-center text-text-tertiary text-xl">
          Explore sensational features to prepare your best investment in cryptocurrency
        </p>
      </div>

      <div className="flex gap-6">
        <div
          ref={cardRef1}
          className="bg-[#212328] rounded-[18px] p-7 w-[330px] border border-[#3F4555]"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <img className="w-20 h-20" src={homeFeatureImg1} alt="home-feature-1" />

              <div className="flex flex-col gap-2 h-[110px]">
                <h3 className="text-text-primary text-2xl font-medium">Manage Portfolio</h3>

                <p className="text-text-secondary text-base">
                  Buy and sell popular digital currencies, keep track of them in the one place.
                </p>
              </div>
            </div>

            <a className="text-primary text-base font-medium cursor-pointer">
              See Explained{' '}
              <FontAwesomeIcon icon={faArrowRight} className="text-primary text-[14px]" />
            </a>
          </div>
        </div>

        <div
          ref={cardRef2}
          className="bg-[#212328] rounded-[18px] p-7 w-[330px] border border-[#3F4555]"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <img className="w-20 h-20" src={homeFeatureImg2} alt="home-feature-1" />

              <div className="flex flex-col gap-2 h-[110px]">
                <h3 className="text-text-primary text-2xl font-medium">Protected Securely</h3>

                <p className="text-text-secondary text-base">
                  All cash balances are covered by FDIC insurance, up to a maximum of $250,000.
                </p>
              </div>
            </div>

            <a className="text-primary text-base font-medium cursor-pointer">
              See Explained{' '}
              <FontAwesomeIcon icon={faArrowRight} className="text-primary text-[14px]" />
            </a>
          </div>
        </div>

        <div
          ref={cardRef3}
          className="bg-[#212328] rounded-[18px] p-7 w-[330px] border border-[#3F4555]"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <img className="w-20 h-20" src={homeFeatureImg3} alt="home-feature-1" />

              <div className="flex flex-col gap-2 h-[110px]">
                <h3 className="text-text-primary text-2xl font-medium">Cryptocurrency Variety</h3>

                <p className="text-text-secondary text-base">
                  Supports a variety of the most popular digital currencies and always uptodate.
                </p>
              </div>
            </div>

            <a className="text-primary text-base font-medium cursor-pointer">
              See Explained{' '}
              <FontAwesomeIcon icon={faArrowRight} className="text-primary text-[14px]" />
            </a>
          </div>
        </div>

        <div
          ref={cardRef4}
          className="bg-[#212328] rounded-[18px] p-7 w-[330px] border border-[#3F4555]"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <img className="w-20 h-20" src={homeFeatureImg4} alt="home-feature-1" />

              <div className="flex flex-col gap-2 h-[110px]">
                <h3 className="text-text-primary text-2xl font-medium">Learn Best Practice</h3>

                <p className="text-text-secondary text-base">
                  Easy to know how to cryptocurrency works and friendly to newbie.
                </p>
              </div>
            </div>

            <a className="text-primary text-base font-medium cursor-pointer">
              See Explained{' '}
              <FontAwesomeIcon icon={faArrowRight} className="text-primary text-[14px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
