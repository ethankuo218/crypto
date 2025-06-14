import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import marketService from '../../services/market.service';
import { CryptoData } from '../../services/types';

interface MyListProps {
  selectedSymbol?: string;
  onSymbolSelect: (symbol: string) => void;
  onInitialData?: (firstSymbol: string) => void;
}

export const MY_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'TRUMPUSDT'];

interface CryptoItemProps {
  symbol: string;
  price: string;
  priceChangePercent: string;
  isSelected: boolean;
  onSelect: (symbol: string) => void;
}

const CryptoItem = memo(
  ({ symbol, price, priceChangePercent, isSelected, onSelect }: CryptoItemProps) => {
    const isUp = parseFloat(priceChangePercent) >= 0;

    const formattedPrice = useMemo(
      () =>
        parseFloat(price).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      [price]
    );

    const formattedPercent = useMemo(
      () => parseFloat(priceChangePercent).toFixed(3),
      [priceChangePercent]
    );

    const handleClick = useCallback(() => {
      onSelect(symbol);
    }, [onSelect, symbol]);

    return (
      <div
        onClick={handleClick}
        className={`bg-[#1E2329] rounded-lg px-3 py-2 transition-all hover:bg-[#2B3139] border ${
          isSelected ? 'border-primary bg-[#2B3139] shadow-[0_0_0_1px_#00EFDF]' : 'border-[#2B3139]'
        } cursor-pointer w-full flex items-center justify-between`}
      >
        <span className="font-medium text-[#EAECEF] tracking-wide text-base">
          {symbol.replace(/USDT$/, '') + '/USDT'}
        </span>

        <div className="flex items-center gap-2">
          <span className="font-mono font-medium text-[#EAECEF] text-xs">${formattedPrice}</span>
          <span
            className={`flex items-center font-medium text-xs px-1.5 py-0.5 rounded ${
              isUp ? 'bg-rise/10 text-rise' : 'bg-fall/10 text-fall'
            }`}
          >
            <span className="mr-1 text-sm">{isUp ? '▲' : '▼'}</span>
            <span className="font-mono">{formattedPercent}%</span>
          </span>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.symbol === nextProps.symbol &&
      prevProps.price === nextProps.price &&
      prevProps.priceChangePercent === nextProps.priceChangePercent &&
      prevProps.isSelected === nextProps.isSelected
    );
  }
);

CryptoItem.displayName = 'CryptoItem';

export const MyList = ({ onSymbolSelect, selectedSymbol, onInitialData }: MyListProps) => {
  const [cryptoData, setCryptoData] = useState<Map<string, CryptoData>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);

  const handleSymbolSelect = useCallback(
    (symbol: string) => {
      onSymbolSelect(symbol);
    },
    [onSymbolSelect]
  );

  const sortedCryptoData = useMemo(() => {
    const data = Array.from(cryptoData.values());
    return data.sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent));
  }, [cryptoData]);

  const isInitialized = cryptoData.size === MY_SYMBOLS.length;

  useEffect(() => {
    if (isInitialized && !initializedRef.current) {
      initializedRef.current = true;
      const firstSymbol = sortedCryptoData[0]?.symbol;
      if (firstSymbol) {
        onInitialData?.(firstSymbol);
      }
    }
  }, [isInitialized, sortedCryptoData, onInitialData]);

  useEffect(() => {
    const handleMarketUpdate = (data: CryptoData) => {
      setCryptoData(prev => {
        const newMap = new Map(prev);
        newMap.set(data.symbol, data);
        return newMap;
      });
    };

    const unsubscribe = marketService.subscribeToMarketUpdates(MY_SYMBOLS, {
      onMessage: handleMarketUpdate,
      onError: (error: Error | Event) => {
        console.error('MyList: Connection error:', error);
        setError('Failed to connect to real-time updates');
      },
    });

    return () => {
      unsubscribe();
      setCryptoData(new Map());
      setError(null);
      initializedRef.current = false;
    };
  }, []);

  return (
    <div className="w-full px-2 pt-2 pb-4">
      {error && <div className="text-fall text-sm mb-2">{error}</div>}
      <div className="flex flex-col gap-2">
        {!isInitialized && !error && (
          <div className="text-[#848E9C] text-sm flex items-center justify-center h-32">
            <div className="animate-pulse">Loading market data...</div>
          </div>
        )}

        {isInitialized &&
          !error &&
          sortedCryptoData.map(crypto => (
            <CryptoItem
              key={crypto.symbol}
              symbol={crypto.symbol}
              price={crypto.price}
              priceChangePercent={crypto.priceChangePercent}
              isSelected={crypto.symbol === selectedSymbol}
              onSelect={handleSymbolSelect}
            />
          ))}
      </div>
    </div>
  );
};
