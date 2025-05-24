import { useEffect, useReducer, useRef, useCallback, memo, useMemo } from 'react';
import { marketService } from '../../services/market.service';
import { CryptoData } from '../../services/types';

interface MyListProps {
  onSymbolSelect: (symbol: string) => void;
  selectedSymbol?: string;
  onInitialData?: (firstSymbol: string) => void;
}

export const MY_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'TRUMPUSDT'];

type State = {
  isInitialized: boolean;
  cryptoData: Map<string, CryptoData>;
  error: string | null;
};

type Action =
  | { type: 'INITIALIZE_DATA'; payload: CryptoData }
  | { type: 'UPDATE_DATA'; payload: CryptoData }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };

const initialState: State = {
  isInitialized: false,
  cryptoData: new Map(),
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INITIALIZE_DATA': {
      const newMap = new Map(state.cryptoData);
      newMap.set(action.payload.symbol, action.payload);
      const isInitialized = newMap.size === MY_SYMBOLS.length;
      return {
        ...state,
        cryptoData: newMap,
        isInitialized,
      };
    }
    case 'UPDATE_DATA': {
      const newMap = new Map(state.cryptoData);
      newMap.set(action.payload.symbol, action.payload);
      return {
        ...state,
        cryptoData: newMap,
      };
    }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

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
          isSelected
            ? 'border-[#F0B90B] bg-[#2B3139] shadow-[0_0_0_1px_#F0B90B]'
            : 'border-[#2B3139]'
        } cursor-pointer w-full flex items-center justify-between`}
      >
        <span className="font-medium text-[#EAECEF] tracking-wide text-base">
          {symbol.replace(/USDT$/, '') + '/USDT'}
        </span>

        <div className="flex items-center gap-2">
          <span className="font-mono font-medium text-[#EAECEF] text-xs">${formattedPrice}</span>
          <span
            className={`flex items-center font-medium text-xs px-1.5 py-0.5 rounded ${
              isUp ? 'bg-[#0ECB81]/10 text-[#0ECB81]' : 'bg-[#F6465D]/10 text-[#F6465D]'
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const initializedRef = useRef(false);

  const handleSymbolSelect = useCallback(
    (symbol: string) => {
      onSymbolSelect(symbol);
    },
    [onSymbolSelect]
  );

  const sortedCryptoData = useMemo(() => {
    const data = Array.from(state.cryptoData.values());
    return data.sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent));
  }, [state.cryptoData]);

  useEffect(() => {
    if (state.isInitialized && !initializedRef.current) {
      initializedRef.current = true;
      const firstSymbol = sortedCryptoData[0]?.symbol;
      if (firstSymbol) {
        onInitialData?.(firstSymbol);
      }
    }
  }, [state.isInitialized, sortedCryptoData, onInitialData]);

  useEffect(() => {
    const handleMarketUpdate = (data: CryptoData) => {
      if (!state.isInitialized) {
        dispatch({ type: 'INITIALIZE_DATA', payload: data });
      } else {
        dispatch({ type: 'UPDATE_DATA', payload: data });
      }
    };

    const unsubscribe = marketService.subscribeToMarketUpdates(MY_SYMBOLS, {
      onMessage: handleMarketUpdate,
      onError: (error: Error | Event) => {
        console.error('MyList: Connection error:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to connect to real-time updates' });
      },
    });

    return () => {
      unsubscribe();
      dispatch({ type: 'RESET' });
      initializedRef.current = false;
    };
  }, []); // Remove state.isInitialized dependency

  return (
    <div className="w-full px-2 pt-2 pb-4">
      {state.error && <div className="text-[#F6465D] text-sm mb-2">{state.error}</div>}
      <div className="flex flex-col gap-2">
        {!state.isInitialized && !state.error && (
          <div className="text-[#848E9C] text-sm flex items-center justify-center h-32">
            <div className="animate-pulse">Loading market data...</div>
          </div>
        )}

        {state.isInitialized &&
          !state.error &&
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
