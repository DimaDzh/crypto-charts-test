import { useState, useEffect } from "react";
import useSWR, { SWRConfiguration } from "swr";
import Binance, { CandleChartInterval_LT } from "binance-api-node";
import { CurrenciesData, Intervals } from "../types";

type FetcherFn = (
  symbol: string,
  interval: CandleChartInterval_LT
) => Promise<{ x: Date; y: number[] }[]>;

const fetcher: FetcherFn = async (symbol, interval) => {
  const client = Binance();
  const response = await client.candles({
    symbol,
    interval,
  });

  const candles = response.map((candle) => {
    return {
      x: new Date(candle.openTime),
      y: [
        parseFloat(candle.open),
        parseFloat(candle.high),
        parseFloat(candle.low),
        parseFloat(candle.close),
      ],
    };
  });

  return candles;
};

export const useCoinData = (slug: string) => {
  const [interval, setInterval] = useState<Intervals>("1d");
  const [symbol, setSymbol] = useState<string>(`${slug}USDT`);
  const [limit, setLimit] = useState<CandleChartInterval_LT>("15m");
  const [currencies, setCurrencies] = useState<CurrenciesData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  const { data, error } = useSWR(
    [symbol, limit],
    () => fetcher(symbol, limit),
    {
      revalidateOnFocus: false,
      onError: () => {
        setError(true);
        setIsLoading(false);
      },
      onSuccess: (newData) => {
        setCurrencies(newData);
        setIsLoading(false);
      },
    }
  );

  useEffect(() => {
    setSymbol(`${slug}USDT`);
  }, [slug]);

  const handleChangeInterval = (
    newInterval: Intervals,
    newLimit: CandleChartInterval_LT
  ) => {
    setInterval(newInterval);
    setLimit(newLimit);
  };

  return {
    interval,
    symbol,
    limit,
    currencies: data || currencies,
    isLoading: (!error && !data) || isLoading,
    isError,
    handleChangeInterval,
  };
};
