import { useEffect, useState } from 'react';
import { marketService } from '../services/market.service';
import { CryptoData } from '../services/types';

interface MyListProps {
  onSymbolSelect: (symbol: string) => void;
}

const MY_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'TRUMPUSDT'];

export const MyList = ({ onSymbolSelect }: MyListProps) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMarketUpdate = (data: CryptoData | CryptoData[]) => {
      if (Array.isArray(data)) {
        setCryptoData(data);
      } else {
        setCryptoData(prevData => {
          const found = prevData.some(item => item.symbol === data.symbol);
          if (found) {
            return prevData.map(item =>
              item.symbol === data.symbol ? { ...item, ...data } : item
            );
          } else {
            return [...prevData, data];
          }
        });
      }
    };

    marketService.subscribeToMarketUpdates(MY_SYMBOLS, {
      onMessage: handleMarketUpdate,
      onError: (error: Error | Event) => {
        console.error('MyList: Connection error:', error);
        setError('Failed to connect to real-time updates');
      },
    });
  }, []);

  return (
    <div className="w-full px-2 pt-2 pb-4">
      {error && <div className="text-[#F6465D] text-sm mb-2">{error}</div>}
      <div className="flex flex-col gap-2">
        {cryptoData.length === 0 && !error && (
          <div className="text-[#848E9C] text-sm">Loading...</div>
        )}
        {cryptoData.map(crypto => {
          const isUp = parseFloat(crypto.priceChangePercent) >= 0;
          return (
            <div
              key={crypto.symbol}
              onClick={() => onSymbolSelect(crypto.symbol)}
              className="bg-[#1E2329] rounded-lg px-3 py-2 transition-transform hover:bg-[#2B3139] border border-[#2B3139] cursor-pointer w-full flex items-center justify-between"
            >
              <span className="font-medium text-[#EAECEF] tracking-wide text-base">
                {crypto.symbol.replace(/USDT$/, '') + '/USDT'}
              </span>

              <div className="flex items-center gap-2">
                <span className="font-mono font-medium text-[#EAECEF] text-xs">
                  $
                  {parseFloat(crypto.price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`flex items-center font-medium text-xs px-1.5 py-0.5 rounded ${
                    isUp ? 'bg-[#0ECB81]/10 text-[#0ECB81]' : 'bg-[#F6465D]/10 text-[#F6465D]'
                  }`}
                >
                  <span className="mr-1 text-sm">{isUp ? '▲' : '▼'}</span>
                  <span className="font-mono">
                    {parseFloat(crypto.priceChangePercent).toFixed(3)}%
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
