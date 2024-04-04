import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { TrendingCoinsListData } from "../types";
import Loader from "./common/Loader";

const TrendingCoinsList: FC<TrendingCoinsListData> = ({ data }) => {
  if (!data.data) {
    return <Loader />;
  }

  const { coins } = data?.data;

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Trending Coins</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-8">
        {coins &&
          coins.map((coin) => (
            <Link href={`/coin/${coin.symbol}`} key={coin.uuid}>
              <div className="flex items-center flex-col justify-center p-4 gap-2 border border-blue-400 bg-slate-100 shadow-md hover:bg-blue-300 rounded-md cursor-pointer transition-colors ease-in">
                <Image
                  src={coin.iconUrl}
                  alt={coin.name}
                  className="size-8"
                  width={50}
                  height={50}
                />
                <h3 className="text-xl font-semibold">{coin.symbol}</h3>
                <p className="font-bold">
                  Last: {parseFloat(coin.price).toFixed(2)} $
                </p>
                <p className="text-sm">Market Cap : {coin.marketCap} $</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TrendingCoinsList;
