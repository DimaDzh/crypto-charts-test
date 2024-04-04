export interface CoinChartData {
  change: string;
  history: { price: string; timestamp: number }[];
}

export type TrendingCoinsListData = {
  data: {
    data: {
      coins: TrendingCoinsData[];
    } | null;
  };
};

type TrendingCoinsData = {
  uuid: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
  iconUrl: string;
  marketCap: string;
  coinrankingUrl: string;
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

export type Intervals = "1d" | "7d" | "30d";

export type FinancialChartProps = {
  data: CurrenciesData;
  interval: Intervals;
};

export type CurrenciesData = { x: Date; y: Number[] }[] | [];

export type SignalFunctionDataType = {
  buyIndex1?: number;
  buyIndex2?: number;
  sellIndex1?: number;
  sellIndex2?: number;
  filteredData: any[];
};
