import React from 'react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const Home: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <LoadingSpinner />
    </div>
  );
};

export default Home;
