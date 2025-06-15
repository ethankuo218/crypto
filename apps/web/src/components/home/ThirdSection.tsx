import { animate, onScroll } from 'animejs';
import { useEffect, useRef } from 'react';
import homeImg2 from '../../assets/home-img-2.png';
import CountUp, { CountUpRef } from '../common/CountUp';
import MapDot, { MapDotRef } from '../common/MapDot';

const ThirdSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countUpRef1 = useRef<CountUpRef>(null);
  const countUpRef2 = useRef<CountUpRef>(null);
  const countUpRef3 = useRef<CountUpRef>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const mapDotRefs = useRef<MapDotRef[]>([]);

  const mapDotList = [
    { x: 16, y: 24 },
    { x: 22, y: 18 },
    { x: 28, y: 21 },
    { x: 20, y: 38 },
    { x: 24, y: 52 },
    { x: 38, y: 5 },
    { x: 44, y: 18 },
    { x: 70, y: 10 },
    { x: 60, y: 16 },
    { x: 52, y: 32 },
    { x: 56, y: 40 },
    { x: 57, y: 57 },
    { x: 74, y: 28 },
    { x: 80, y: 22 },
    { x: 78, y: 44 },
    { x: 86, y: 35 },
    { x: 44, y: 45 },
    { x: 54, y: 60 },
    { x: 28, y: 60 },
    { x: 80, y: 75 },
  ];

  useEffect(() => {
    const playEnterAnimation = () => {
      countUpRef1.current?.start();
      countUpRef2.current?.start();
      countUpRef3.current?.start();

      animate(imgRef.current!, {
        opacity: [{ to: 1, duration: 1000, easing: 'easeOutBack' }],
        scale: [{ to: 1, duration: 1000, easing: 'linear' }],
        onComplete: () => {
          mapDotRefs.current.forEach(dot => dot.trigger());
        },
      });
    };

    const playLeaveAnimation = () => {
      animate(imgRef.current!, {
        opacity: [{ to: 0.2, duration: 1000, easing: 'easeOutCubic' }],
        scale: [{ to: 0, duration: 1000, easing: 'linear' }],
        delay: 0,
      });

      mapDotRefs.current.forEach(dot => dot.reset());
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
          <div className="relative w-[661px] h-[334px] mx-auto">
            <img src={homeImg2} alt="home-img-2" className="w-full h-full object-contain" />
            <div className="absolute top-0 left-0 w-full h-full">
              {mapDotList.map((dot, index) => (
                <MapDot
                  key={index}
                  x={dot.x}
                  y={dot.y}
                  ref={el => {
                    el && (mapDotRefs.current[index] = el);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
