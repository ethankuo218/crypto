import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useState } from 'react';
import { MarketListPanelContents } from './MarketListPanelContents';

const MarketNavPanel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const listItems = [
    {
      label: 'All',
      component: MarketListPanelContents.All,
    },
    {
      label: 'Solana',
      component: MarketListPanelContents.All,
    },
    {
      label: 'RWA',
      component: MarketListPanelContents.All,
    },
    {
      label: 'Meme',
      component: MarketListPanelContents.All,
    },
    {
      label: 'Payments',
      component: MarketListPanelContents.All,
    },
    {
      label: 'AI',
      component: MarketListPanelContents.All,
    },
  ];

  return (
    <div className="w-full p-6 border border-[#3F4555] rounded-3xl ">
      <TabGroup className="flex flex-col gap-4" onChange={index => setActiveIndex(index)}>
        <TabList className="relative h-8 w-full">
          <div
            className="absolute top-0 w-[100px] h-full border-b-[3px] border-primary transition-all duration-300"
            style={{ transform: `translateX(${activeIndex * 116}px)` }}
          />

          <div className="absolute top-0 left-0 w-full h-full flex gap-4">
            {listItems.map((item, index) => (
              <Tab
                key={index}
                className={({ selected, hover }) =>
                  `w-[100px] h-full flex items-center justify-center text-sm font-medium ${
                    selected || hover ? 'text-primary' : 'text-text-secondary'
                  } focus:outline-none`
                }
              >
                {item.label}
              </Tab>
            ))}
          </div>
        </TabList>

        <div className="w-full h-[1px] bg-[#3F4555]"></div>

        <TabPanels className="h-full">
          {listItems.map((item, index) => (
            <TabPanel key={index}>
              <item.component />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default MarketNavPanel;
