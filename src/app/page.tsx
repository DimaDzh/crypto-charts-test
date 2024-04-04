import TrendingCoinsList from "./components/CoinsList";
import FinChartOnline from "./components/FinChartOnline";
import { fetchWsBinance } from "./utils/getOnlineData";

async function getCoinList(): Promise<any> {
  try {
    const response = await fetch(
      `https://api.coinranking.com/v2/coins?limit=10&orderBy=marketCap`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const coinList = await getCoinList();
  const somtest = fetchWsBinance("BTCUSDT", "1d");

  return (
    <div className="flex flex-col justify-center items-center py-12">
      <h1 className="text-3xl font-bold mb-6">Crypto Price History</h1>

      <main className="flex flex-col items-center w-full">
        <TrendingCoinsList data={coinList} />
      </main>
    </div>
  );
}

export const generateStaticParams = async () => {
  const response = await fetch(
    `https://api.coinranking.com/v2/coins?limit=10&orderBy=marketCap`
  );
  const data = await response.json();
  const { coins } = data.data;
  return coins.map((item: { uuid: string }) => {
    return item.uuid;
  });
};
