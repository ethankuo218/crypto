import React, { useState } from 'react';
import { MarketChart } from '../components/market/MarketChart';
import { MyList } from '../components/market/MyList';

const MarketDashboard: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTCUSDT');

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="flex h-full">
      <div className="w-[300px] border-r border-[#2B3139]">
        <MyList
          onSymbolSelect={handleSymbolSelect}
          selectedSymbol={selectedSymbol}
          onInitialData={handleSymbolSelect}
        />
      </div>

      <div className="flex-1 p-4">
        <MarketChart symbol={selectedSymbol} />
      </div>
    </div>
  );
};

export default MarketDashboard;
