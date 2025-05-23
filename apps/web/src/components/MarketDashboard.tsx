import { useState } from 'react';
import { MyList } from './MyList';
import { MarketChart } from './MarketChart';

export const MarketDashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-[#2B3139]">
        <MyList onSymbolSelect={setSelectedSymbol} />
      </div>
      <div className="flex-1 p-4">
        <MarketChart symbol={selectedSymbol} />
      </div>
    </div>
  );
};
