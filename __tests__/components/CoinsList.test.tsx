import TrendingCoinsList from "@/app/components/CoinsList";
import { TrendingCoinsListData } from "@/app/types";
import { render, screen } from "@testing-library/react";

const mockData: TrendingCoinsListData = {
  data: {
    data: {
      coins: [
        {
          uuid: "1",
          symbol: "BTC",
          name: "Bitcoin",
          price: "50000",
          change: "0.05",
          iconUrl: "/bitcoin-icon-url",
          marketCap: "1000000000",
          coinrankingUrl: "bitcoin-coinranking-url",
        },
        {
          uuid: "2",
          symbol: "ETH",
          name: "Ethereum",
          price: "3500",
          change: "-0.02",
          iconUrl: "/ethereum-icon-url",
          marketCap: "500000000",
          coinrankingUrl: "ethereum-coinranking-url",
        },
      ],
    },
  },
};

describe("TrendingCoinsList Component", () => {
  it("renders loader when data is not available", () => {
    render(<TrendingCoinsList data={{ data: null }} />);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });

  it("renders trending coins when data is available", () => {
    render(<TrendingCoinsList data={mockData.data} />);
    const trendingCoinsTitle = screen.getByText("Trending Coins");
    expect(trendingCoinsTitle).toBeInTheDocument();

    const bitcoinSymbol = screen.getByText("BTC");
    expect(bitcoinSymbol).toBeInTheDocument();
    const ethereumSymbol = screen.getByText("ETH");
    expect(ethereumSymbol).toBeInTheDocument();
  });
});
