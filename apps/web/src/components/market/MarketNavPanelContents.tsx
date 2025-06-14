const Favorites: React.FC = () => {
  let navItems = [
    {
      name: 'Bitcoin',
      symbol: 'BTC/USDT',
      price: 105265.03,
      currency: 'USDT',
      change: -801.57,
      changePercentage: -0.0076,
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501628',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH/USDT',
      price: 2557.1,
      currency: 'USDT',
      change: -23.2,
      changePercentage: -0.009,
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501625',
    },
    {
      name: 'Solana',
      symbol: 'SOL/USDT',
      price: 147.14,
      currency: 'USDT',
      change: 1.2,
      changePercentage: 0.008,
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422',
    },
    {
      name: 'Dogecoin',
      symbol: 'DOGE/USDT',
      price: 0.17805,
      currency: 'USDT',
      change: 0.0001,
      changePercentage: 0.0006,
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501625',
    },
  ];

  // randomize the list
  const randomNavItems = navItems.sort(() => Math.random() - 0.5);
  navItems = randomNavItems;

  return (
    <div className="w-full h-full flex gap-6 overflow-x-auto">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`w-[300px] h-full rounded-xl p-8 flex flex-col gap-3 cursor-pointer hover:bg-[#2F3241]/50 transition-all duration-300`}
        >
          <div className="flex gap-2 items-center">
            <img src={item.image} alt={item.name} className="w-6 h-6" />
            <p className="text-sm text-text-primary font-medium">{item.name}</p>
            <p className="text-xs text-text-secondary">{item.symbol}</p>
          </div>

          <p className="text-xl text-text-primary font-medium">
            {item.currency} {item.price}
          </p>

          <div className="flex gap-2 items-center">
            <p className="text-xs text-text-secondary">
              {item.change > 0 ? '+' : ''}
              {item.change}
            </p>

            <div
              className={`px-2 py-[2px] rounded-full ${
                item.changePercentage > 0 ? 'bg-rise' : 'bg-fall'
              }`}
            >
              <p className="text-xs text-text-primary">{item.changePercentage}%</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AllCryptos: React.FC = () => {
  return <div>All Cryptos</div>;
};

const Hot: React.FC = () => {
  return <div>Hot</div>;
};

const Alpha: React.FC = () => {
  return <div>Alpha</div>;
};

const NewListing: React.FC = () => {
  return <div>New Listing</div>;
};

const FutureMarkets: React.FC = () => {
  return <div>Future Markets</div>;
};

const SpotMarket: React.FC = () => {
  return <div>Spot Market</div>;
};

export const MarketNavPanelContents = {
  Favorites,
  AllCryptos,
  Hot,
  Alpha,
  NewListing,
  FutureMarkets,
  SpotMarket,
};
