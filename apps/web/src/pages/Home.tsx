import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeDecoration from '../assets/home-decoration.svg';
import homeFeatureImg1 from '../assets/home-feature-1.svg';
import homeFeatureImg2 from '../assets/home-feature-2.svg';
import homeFeatureImg3 from '../assets/home-feature-3.svg';
import homeFeatureImg4 from '../assets/home-feature-4.svg';
import homeImg1 from '../assets/home-img-1.png';
import homeImg2 from '../assets/home-img-2.png';
import homeImg3 from '../assets/home-img-3.png';
import homeImg4 from '../assets/home-img-4.png';
import mobileImg1 from '../assets/mobile-img-1.svg';
import mobileImg2 from '../assets/mobile-img-2.svg';
import mobileImg3 from '../assets/mobile-img-3.svg';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import MarketListPanel from '../components/market/MarketListPanel';
import MarketNavPanel from '../components/market/MarketNavPanel';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full">
      {/* Header */}
      <Header />

      <div className="max-w-[1440px] mx-auto mt-12 flex flex-col gap-[160px]">
        {/* First Section */}
        <section className="flex flex-col gap-3 pt-[80px]">
          <div className=" flex justify-between">
            <div className="max-w-[30vw] flex flex-col gap-6">
              <h1 className="text-text-primary text-6xl font-bold">
                Buy & Sell Digital Assets In The Rocket
              </h1>

              <p className="text-text-secondary text-lg">
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
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-text-primary text-4xl font-bold">Market Update</h2>

            <a className=" text-text-primary text-[16px] leading-[16px] font-medium max-w-[185px] underline cursor-pointer">
              See All Coins
            </a>
          </div>

          <MarketListPanel />
        </section>

        {/* Third Section */}
        <section className="flex flex-col gap-10 bg-[#212328] rounded-3xl px-[60px] py-[80px]">
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
                  <div className="text-center text-[60px] text-text-primary font-medium">32K+</div>
                  <label className="text-center text-text-tertiary text-lg">People Joined</label>
                </div>

                <div className="flex flex-col gap-2 max-w-[33%]">
                  <div className="text-center text-[60px] text-text-primary font-medium">250+</div>
                  <label className="text-center text-text-tertiary text-lg">Vip Users</label>
                </div>

                <div className="flex flex-col gap-2 max-w-[33%]">
                  <div className="text-center text-[60px] text-text-primary font-medium">87+</div>
                  <label className="text-center text-text-tertiary text-lg">Big Company</label>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <img src={homeImg2} alt="home-img-2" />
            </div>
          </div>
        </section>

        {/* Fourth Section */}
        <section className="flex gap-10 py-[80px]">
          <div className="flex-1">
            {/* Carousel */}
            <img src={homeImg3} alt="home-img-3" />
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

        {/* Fifth Section */}
        <section className="flex flex-col gap-10 py-[80px]">
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-text-primary text-5xl font-bold">
              CryptoCap Amazing Faetures
            </h2>
            <p className="text-center text-text-tertiary text-xl">
              Explore sensational features to prepare your best investment in cryptocurrency
            </p>
          </div>

          <div className="flex gap-6">
            <div className="bg-[#212328] rounded-[18px] p-7 w-[330px] border border-[#3F4555]">
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

            <div className="bg-[#212328] rounded-[18px] p-7 w-[330px] border border-[#3F4555]">
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

            <div className="bg-[#212328] rounded-[18px] p-7 w-[330px] border border-[#3F4555]">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <img className="w-20 h-20" src={homeFeatureImg3} alt="home-feature-1" />

                  <div className="flex flex-col gap-2 h-[110px]">
                    <h3 className="text-text-primary text-2xl font-medium">
                      Cryptocurrency Variety
                    </h3>

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

            <div className="bg-[#212328] rounded-[18px] p-7 w-[330px] border border-[#3F4555]">
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

        {/* Sixth Section */}
        <section className="grid grid-cols-3 gap-10 py-[80px]">
          <div className="flex items-center justify-center col-span-1 ">
            <img className="rounded-3xl overflow-hidden" src={homeImg4} alt="home-img-4" />
          </div>

          <div className="flex flex-col gap-6 col-span-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-text-primary text-5xl font-bold">
                Trade & invest anytime,anywhere
              </h2>

              <p className="text-text-secondary text-xl">
                Our comprehensive reports are designed to provide you with a detailed analysis of
                your cryptocurrency portfolio. Our team of experts carefully evaluates each of your
                investments and provides you with recommendations to help you optimize your returns
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <div className="h-full w-[50px] rounded-full flex items-center justify-center">
                  <img src={mobileImg1} alt="mobile-img-1" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-text-primary text-2xl font-medium">Verify your identity</h3>

                  <p className="text-text-secondary text-base">
                    Complete the identity verification process to secure your Account and
                    transactions.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-full w-[50px] rounded-full flex items-center justify-center">
                  <img src={mobileImg2} alt="mobile-img-2" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-text-primary text-2xl font-medium">Fund your Account</h3>

                  <p className="text-text-secondary text-base">
                    Add funds to your crypto account to start trading crypto. Add funds with variety
                    of Payment methods
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-full w-[50px] rounded-full flex items-center justify-center">
                  <img src={mobileImg3} alt="mobile-img-3" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-text-primary text-2xl font-medium">Start trading</h3>

                  <p className="text-text-secondary text-base">
                    You are good to go! Buy/sell crypto, set up recurring buys for your investments,
                    and discover what Binance has to offer.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <button className="flex gap-2 bg-[#0C0C0C] text-text-primary p-4 rounded-2xl max-w-[190px] border border-[#3F4555] items-center">
                <FontAwesomeIcon icon={faApple} className="text-text-primary text-[35px]" />

                <div className="flex flex-col gap-2 items-start">
                  <p className="text-text-primary text-[12px] leading-[15px]">Download on the</p>
                  <p className="text-text-primary text-[16px] leading-[19px] font-bold">
                    App Store
                  </p>
                </div>
              </button>

              <button className="flex gap-2 bg-[#0C0C0C] text-text-primary p-4 rounded-2xl max-w-[190px] border border-[#3F4555] items-center">
                <FontAwesomeIcon icon={faGooglePlay} className="text-text-primary text-[30px]" />

                <div className="flex flex-col gap-2 items-start">
                  <p className="text-text-primary text-[12px] leading-[15px]">Download on the</p>
                  <p className="text-text-primary text-[16px] leading-[19px] font-bold">
                    Google Play
                  </p>
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
