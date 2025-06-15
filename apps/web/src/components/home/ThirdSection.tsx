import { animate, onScroll } from 'animejs';
import { useEffect, useRef } from 'react';
import homeImg2 from '../../assets/home-img-2.png';
import CountUp, { CountUpRef } from '../common/CountUp';

const ThirdSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countUpRef1 = useRef<CountUpRef>(null);
  const countUpRef2 = useRef<CountUpRef>(null);
  const countUpRef3 = useRef<CountUpRef>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const playEnterAnimation = () => {
      countUpRef1.current?.start();
      countUpRef2.current?.start();
      countUpRef3.current?.start();

      animate(imgRef.current!, {
        opacity: [{ to: 1, duration: 1000, easing: 'easeOutBack' }],
        scale: [{ to: 1, duration: 1000, easing: 'linear' }],
        delay: 100,
      });
    };

    const playLeaveAnimation = () => {
      animate(imgRef.current!, {
        opacity: [{ to: 0.2, duration: 1000, easing: 'easeOutCubic' }],
        scale: [{ to: 0, duration: 1000, easing: 'linear' }],
        delay: 0,
      });
    };

    onScroll({
      target: sectionRef.current!,
      enter: 'bottom top+=200',
      leave: 'top bottom-=100',
      debug: true,
      onEnter: playEnterAnimation,
      onLeave: playLeaveAnimation,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-10 bg-[#212328] rounded-3xl px-[60px] py-[80px]"
    >
      <h2 className="text-text-primary text-5xl font-medium">Our Vision </h2>

      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h3 className="text-text-primary text-2xl font-medium">
              Users from all over the world
            </h3>

            <p className="text-text-secondary text-lg">
              We are a team of developers who are passionate about creating a better future for
              everyone.
            </p>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-2 max-w-[33%]">
              <CountUp
                ref={countUpRef1}
                to={32}
                duration={1000}
                className="text-center text-[60px] text-text-primary font-medium"
                suffix="K+"
              />
              <label className="text-center text-text-tertiary text-lg">People Joined</label>
            </div>

            <div className="flex flex-col gap-2 max-w-[33%]">
              <CountUp
                ref={countUpRef2}
                to={250}
                duration={1000}
                className="text-center text-[60px] text-text-primary font-medium"
                suffix="+"
              />
              <label className="text-center text-text-tertiary text-lg">Vip Users</label>
            </div>

            <div className="flex flex-col gap-2 max-w-[33%]">
              <CountUp
                ref={countUpRef3}
                to={87}
                duration={1000}
                className="text-center text-[60px] text-text-primary font-medium"
                suffix="+"
              />
              <label className="text-center text-text-tertiary text-lg">Big Company</label>
            </div>
          </div>
        </div>

        <div ref={imgRef} className="flex-1">
          <img src={homeImg2} alt="home-img-2" />
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
