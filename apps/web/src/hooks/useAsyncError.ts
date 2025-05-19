import { useState } from 'react';

export const useAsyncError = () => {
  const [, setError] = useState<Error | null>(null);

  return (error: Error) => {
    setError(() => {
      throw error;
    });
  };
};
