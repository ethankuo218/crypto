import React from 'react';
import FifthSection from '../components/home/FifthSection';
import FirstSection from '../components/home/FirstSection';
import ForthSection from '../components/home/ForthSection';
import SecondSection from '../components/home/SecondSection';
import SixthSection from '../components/home/SixthSection';
import ThirdSection from '../components/home/ThirdSection';

const Home: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto flex flex-col gap-[160px] px-5">
      <FirstSection />

      <SecondSection />

      <ThirdSection />

      <ForthSection />

      <FifthSection />

      <SixthSection />
    </div>
  );
};

export default Home;
