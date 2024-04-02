export interface Signal {
  timestamp: number;
  price: number;
  volume: number;
}

export interface CoinChartProps {
  data: CoinChartData;
  interval: "24h" | "7d" | "30d";
  coinName: string;
}

export interface CoinDeatilsProps {
  coinName: string;
}

export interface CoinChartData {
  change: string;
  history: { price: string; timestamp: number }[];
}

export type TrendingCoinsListData = {
  data: {
    data: {
      coins:
        | {
            uuid: string;
            symbol: string;
            name: string;
            price: string;
            change: string;
            iconUrl: string;
            marketCap: string;
            coinrankingUrl: string;
          }[];
    } | null;
  };
};

export interface CoinHistoryData {
  success: boolean;
  message: null | string;
  data: any;
}

export interface CoinDetailsResponse {
  status: string;
  data: CoinDetailsData;
}
export interface CoinDetailsData {
  coin: {
    name: string;
    symbol: string;
    description: string;
    color: string;
    allTimeHigh: {
      price: number;
      timePeriod: number;
    };
    websiteUrl: string;
  };
}
