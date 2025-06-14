import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeDecoration from '../assets/home-decoration.svg';
import homeImg1 from '../assets/home-img-1.png';
import Header from '../components/layout/Header';
import MarketListPanel from '../components/market/MarketListPanel';
import MarketNavPanel from '../components/market/MarketNavPanel';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-background">
      <Header />

      <div className="max-w-[1440px] mx-auto mt-12">
        {/* First Section */}
        <section className="flex flex-col gap-3 py-20">
          <div className=" flex justify-between">
            <div className="max-w-[30vw] flex flex-col gap-6">
              <h1 className="text-text-primary text-6xl font-bold">
                Buy & Sell Digital Assets In The Rocket
              </h1>

              <p className="text-text-secondary text-2xl font-medium">
                Coin rocket is the easiest, safest, and fastest way to buy & sell crypto asset
                exchange.
              </p>

              <button
                className="bg-primary text-background text-[16px] leading-[16px] font-medium px-6 py-4 rounded-full max-w-[185px]"
                onClick={() => navigate('/market')}
              >
                Get Started Now
              </button>
            </div>

            <div className="max-w-[30vw]">
              <img className="w-full h-full" src={homeImg1} alt="home-img-1" />
            </div>
          </div>

          <div className="w-full h-full relative">
            <MarketNavPanel />

            <div className="absolute top-0 right-[-75px] pointer-events-none">
              <img className="w-[710px] h-[315px]" src={homeDecoration} alt="home-decoration" />
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section className="flex flex-col gap-3 py-20">
          <div className="flex justify-between items-end">
            <h2 className="text-text-primary text-4xl font-bold">Market Update</h2>

            <a className=" text-text-primary text-[16px] leading-[16px] font-medium max-w-[185px] underline cursor-pointer">
              See All Coins
            </a>
          </div>

          <MarketListPanel />
        </section>
      </div>
    </div>
  );
};

export default Home;
