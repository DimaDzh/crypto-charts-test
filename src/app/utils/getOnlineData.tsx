import Binance, { CandleChartInterval_LT } from "binance-api-node";

type FetcherFn = (
  symbol: string,
  interval: CandleChartInterval_LT
) => Promise<{ x: Date; y: number[] }[]>;

export const fetchWsBinance: FetcherFn = async (symbol, interval) => {
  const client = Binance();
  client.ws.ticker("HSRETH", (ticker) => {
    console.log(ticker);
  });
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
