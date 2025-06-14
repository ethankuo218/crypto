import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useState } from 'react';
import { MarketNavPanelContents } from './MarketNavPanelContents';

const MarketNavPanel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    {
      label: 'Favorites',
      component: MarketNavPanelContents.Favorites,
    },
    {
      label: 'All Cryptos',
      component: MarketNavPanelContents.Favorites,
    },
    {
      label: 'Hot',
      component: MarketNavPanelContents.Favorites,
    },
    {
      label: 'Alpha',
      component: MarketNavPanelContents.Favorites,
    },
    {
      label: 'New Listing',
      component: MarketNavPanelContents.Favorites,
    },
    {
      label: 'Future Markets',
      component: MarketNavPanelContents.Favorites,
    },
  ];

  return (
    <div className="w-full p-6 border border-[#3F4555] rounded-3xl ">
      <TabGroup className="flex flex-col gap-4" onChange={index => setActiveIndex(index)}>
        <TabList className="relative h-8 w-full">
          <div
            className="absolute top-0 w-[100px] h-full bg-primary rounded-full transition-all duration-300"
            style={{ transform: `translateX(${activeIndex * 116}px)` }}
          />

          <div className="absolute top-0 left-0 w-full h-full flex gap-4">
            {navItems.map((item, index) => (
              <Tab
                key={index}
                className={({ selected, hover }) =>
                  `w-[100px] h-full flex items-center justify-center text-sm font-medium ${
                    selected || hover ? 'text-background' : 'text-text-secondary'
                  } focus:outline-none hover:bg-primary/75 transition-all duration-300 rounded-full`
                }
              >
                {item.label}
              </Tab>
            ))}
          </div>
        </TabList>

        <div className="w-full h-[1px] bg-[#3F4555]"></div>

        <TabPanels className="h-40">
          {navItems.map((item, index) => (
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
