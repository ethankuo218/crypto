import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const All: React.FC = () => {
  let listItems = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 105265.03,
      currency: 'USDT',
      change: -801.57,
      changePercentage: -0.0076,
      volume: 5540000000000,
      marketCap: 21000000000000,
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501628',
      isFavorite: true,
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2557.1,
      currency: 'USDT',
      change: -23.2,
      changePercentage: -0.009,
      volume: 2526000000000,
      marketCap: 21000000000000,
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501625',
      isFavorite: false,
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      price: 147.14,
      currency: 'USDT',
      change: 1.2,
      changePercentage: 0.008,
      volume: 123000000000,
      marketCap: 21000000000000,
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422',
      isFavorite: false,
    },
    {
      name: 'Dogecoin',
      symbol: 'DOGE',
      price: 0.17805,
      currency: 'USDT',
      change: 0.0001,
      changePercentage: 0.0006,
      volume: 123000000000,
      marketCap: 21000000000000,
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501625',
      isFavorite: false,
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      price: 1,
      currency: 'USDT',
      change: 0.0001,
      changePercentage: 0.0006,
      volume: 123000000000,
      marketCap: 21000000000000,
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501625',
      isFavorite: false,
    },
    {
      name: 'Tether',
      symbol: 'USDC',
      price: 1,
      currency: 'USDC',
      change: 0.0001,
      changePercentage: 0.0006,
      volume: 123000000000,
      marketCap: 21000000000000,
      image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042194',
      isFavorite: false,
    },
    {
      name: 'TRON',
      symbol: 'TRX',
      price: 1,
      currency: 'TRX',
      change: 0.0001,
      changePercentage: 0.0006,
      volume: 123000000000,
      marketCap: 21000000000000,
      image: 'https://assets.coingecko.com/coins/images/1094/large/tron.png?1547042194',
      isFavorite: false,
    },
    {
      name: 'Cardano',
      symbol: 'ADA',
      price: 1,
      currency: 'ADA',
      change: 0.0001,
      changePercentage: 0.0006,
      volume: 123000000000,
      marketCap: 21000000000000,
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1547042283',
      isFavorite: false,
    },
  ];

  // randomize the list
  const randomListItems = listItems.sort(() => Math.random() - 0.5);

  listItems = randomListItems;

  return (
    <div className="w-full h-full flex gap-6">
      <table className="w-full">
        <thead>
          <tr className="text-text-primary text-sm font-medium">
            <th className="text-center w-12"></th>
            <th className="text-center w-12">#</th>
            <th className="text-left">Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Change</th>
            <th className="text-right">24h Volume</th>
            <th className="text-right">Market Cap</th>
          </tr>
        </thead>

        <tbody className="text-text-primary text-sm font-medium">
          {listItems.map((item, index) => (
            <tr key={index} className="h-12">
              <td className="text-center">
                <button className="w-6 h-6">
                  {item.isFavorite ? (
                    <FontAwesomeIcon icon={faStar} className="text-[#FFD700]" />
                  ) : (
                    <FontAwesomeIcon icon={faStarRegular} />
                  )}
                </button>
              </td>
              <td className="text-center">{index + 1}</td>
              <td className="text-left">
                <div className="flex gap-2 items-center">
                  <img src={item.image} alt={item.name} className="w-6 h-6" />
                  <p className="text-sm text-text-primary font-medium">{item.name}</p> |
                  <p className="text-xs text-text-secondary">{item.symbol}</p>
                </div>
              </td>
              <td className="text-right">$ {item.price}</td>
              <td className="text-right">
                <p className={`text-xs ${item.changePercentage > 0 ? 'text-rise' : 'text-fall'}`}>
                  {item.changePercentage}%
                </p>
              </td>
              <td className="text-right">$ {item.volume}</td>
              <td className="text-right">$ {item.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Solana: React.FC = () => {
  return <div>All Cryptos</div>;
};

const RWA: React.FC = () => {
  return <div>Hot</div>;
};

const Meme: React.FC = () => {
  return <div>Alpha</div>;
};

const Payments: React.FC = () => {
  return <div>New Listing</div>;
};

const AI: React.FC = () => {
  return <div>Future Markets</div>;
};

const FutureMarkets: React.FC = () => {
  return <div>Spot Market</div>;
};

export const MarketListPanelContents = {
  All,
  Solana,
  RWA,
  Meme,
  Payments,
  AI,
  FutureMarkets,
};
