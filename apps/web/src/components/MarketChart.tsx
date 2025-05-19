import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  CandlestickSeries,
  HistogramData,
  HistogramSeries,
  UTCTimestamp,
} from 'lightweight-charts';
import { marketService } from '../services/market.service';
import { useAsyncError } from '../hooks/useAsyncError';
import { ErrorBoundary } from './ErrorBoundary';

interface MarketChartProps {
  symbol: string;
}

const INTERVALS = [
  { label: '1m', value: '1m' },
  { label: '5m', value: '5m' },
  { label: '15m', value: '15m' },
  { label: '1h', value: '1h' },
  { label: '4h', value: '4h' },
  { label: '1d', value: '1d' },
];

const MarketChartContent = ({ symbol }: MarketChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [interval, setInterval] = useState('1h');
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const throwAsyncError = useAsyncError();

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1E2329' },
        textColor: '#EAECEF',
      },
      grid: {
        vertLines: { color: '#2B3139' },
        horzLines: { color: '#2B3139' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#2B3139',
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          switch (interval) {
            case '1m':
              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            case '5m':
            case '15m':
              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            case '1h':
            case '4h':
              return date.toLocaleTimeString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
              });
            case '1d':
              return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            default:
              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }
        },
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#0ECB81',
      downColor: '#F6465D',
      borderVisible: false,
      wickUpColor: '#0ECB81',
      wickDownColor: '#F6465D',
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#26a69a',
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });

    chart.priceScale('volume').applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });
    chart.priceScale('right').applyOptions({
      scaleMargins: { top: 0, bottom: 0.2 },
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    volumeSeriesRef.current = volumeSeries;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [interval]);

  // Handle data updates
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const processInitialData = (klines: any[]) => {
      if (!candlestickSeriesRef.current || !volumeSeriesRef.current) return;

      const sortedData = [...klines].sort((a, b) => a[0] - b[0]);

      const candlestickData: CandlestickData<UTCTimestamp>[] = sortedData.map(item => ({
        time: Math.floor(item[0] / 1000) as UTCTimestamp,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
      }));

      const volumeData: HistogramData<UTCTimestamp>[] = sortedData.map(item => {
        const close = parseFloat(item[4]);
        const open = parseFloat(item[1]);
        return {
          time: Math.floor(item[0] / 1000) as UTCTimestamp,
          value: parseFloat(item[5]),
          color: close >= open ? '#0ECB81' : '#F6465D',
        };
      });

      candlestickSeriesRef.current.setData(candlestickData);
      volumeSeriesRef.current.setData(volumeData);
    };

    const processKlineData = (message: { data: { k: any }; symbol: string; interval: string }) => {
      if (!candlestickSeriesRef.current || !volumeSeriesRef.current) return;

      // The kline data is in message.data.k
      const kline = message.data.k;

      // Create candlestick data
      const candlestickData: CandlestickData<UTCTimestamp> = {
        time: Math.floor(kline.t / 1000) as UTCTimestamp, // Convert milliseconds to seconds
        open: parseFloat(kline.o),
        high: parseFloat(kline.h),
        low: parseFloat(kline.l),
        close: parseFloat(kline.c),
      };

      // Create volume data
      const volumeData: HistogramData<UTCTimestamp> = {
        time: Math.floor(kline.t / 1000) as UTCTimestamp,
        value: parseFloat(kline.v), // Base asset volume
        color: parseFloat(kline.c) >= parseFloat(kline.o) ? '#0ECB81' : '#F6465D',
      };

      // Update the chart with the new data
      candlestickSeriesRef.current.update(candlestickData);
      volumeSeriesRef.current.update(volumeData);
    };

    try {
      setError(null);
      unsubscribe = marketService.subscribeToKlineStream(symbol, interval, {
        onInitial: processInitialData,
        onMessage: (message: { data: { k: any }; symbol: string; interval: string }) =>
          processKlineData(message),
        onError: error => {
          console.error('Error in kline stream:', error);
          setError('Failed to receive real-time updates');
        },
      });
    } catch (err) {
      console.error('Error subscribing to kline stream:', err);
      const error = err instanceof Error ? err : new Error('Failed to subscribe to kline stream');
      setError(error.message);
      throwAsyncError(error);
    }

    // Cleanup subscription on unmount or when symbol/interval changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [symbol, interval, throwAsyncError]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-[#EAECEF] text-xl font-medium">{symbol}</h2>
          {error && <span className="text-[#F6465D] text-sm">{error}</span>}
        </div>
        <select
          value={interval}
          onChange={e => setInterval(e.target.value)}
          className="bg-[#2B3139] text-[#EAECEF] border border-[#2B3139] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#F0B90B]"
        >
          {INTERVALS.map(int => (
            <option key={int.value} value={int.value}>
              {int.label}
            </option>
          ))}
        </select>
      </div>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
};

export const MarketChart = (props: MarketChartProps) => (
  <ErrorBoundary>
    <MarketChartContent {...props} />
  </ErrorBoundary>
);
