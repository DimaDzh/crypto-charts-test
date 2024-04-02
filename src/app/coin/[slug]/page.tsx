"use client";
import React, { FC, useEffect, useState } from "react";
import CoinChart from "@/app/components/CoinChart";
import Link from "next/link";
import {
  CoinHistoryData,
  CoinDetailsData,
  CoinDetailsResponse,
  CoinChartData,
} from "@/app/types";
import Loader from "@/app/components/common/Loader";

async function getCoinData(
  slug: string,
  interval: string
): Promise<CoinHistoryData> {
  const response = await fetch(
    `https://api.coinranking.com/v2/coin/${slug}/history?timePeriod=${interval}`
  );
  const data: CoinHistoryData = await response.json();

  return data;
}
async function getCoinDetails(slug: string): Promise<CoinDetailsResponse> {
  const response = await fetch(`https://api.coinranking.com/v2/coin/${slug}`);
  const data: CoinDetailsResponse = await response.json();

  return data;
}

const CoinPage: FC<{ params: { slug: string } }> = ({ params }) => {
  const slug = params.slug;
  const [interval, setInterval] = useState<string>("24h");
  const [periodData, setPeriodData] = useState<CoinChartData | null>(null);
  const [coinData, setCoinData] = useState<CoinDetailsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCoinData(slug, interval);
      if (response.data) {
        setPeriodData(response.data);
      }
    };
    fetchData();
  }, [interval, slug]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCoinDetails(slug);
      if (response.status === "success") {
        setCoinData(response.data);
      }
    };
    fetchData();
  }, [slug]);

  const handleChangeInterval = async (newInterval = interval) => {
    setInterval(newInterval);
    const data = await getCoinData(slug, newInterval);
    setPeriodData(data.data);
  };

  if (!periodData || !coinData || !coinData.coin) {
    return <Loader />;
  }

  const coinName = coinData.coin.name || "Coin Name Not Available";

  return (
    <section className="w-full mx-auto flex justify-center flex-col m-12 container ">
      <Link
        href={"/"}
        className="rounded bg-indigo-500 px-2 py-1 w-fit text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Back to coin list
      </Link>

      <div className="flex flex-1 items-center justify-center gap-2 my-6 mx-auto w-full">
        <button
          className={`interval-btn ${interval === "24h" && "ring-2"}`}
          onClick={() => handleChangeInterval("24h")}
        >
          1 day
        </button>
        <button
          className={`interval-btn ${interval === "7d" && "ring-2"}`}
          onClick={() => handleChangeInterval("7d")}
        >
          1 week
        </button>
        <button
          className={`interval-btn ${interval === "30d" && "ring-2"}`}
          onClick={() => handleChangeInterval("30d")}
        >
          1 Month
        </button>
      </div>
      <div className="w-full max-w-5xl mx-auto h-fit">
        <CoinChart data={periodData} interval={interval} coinName={coinName} />
      </div>
      {coinData && (
        <div className="flex items-center flex-col justify-center w-full mx-auto max-w-3xl text-center border rounded-xl shadow p-3 my-12">
          <p>{coinData?.coin.description}</p>
          {coinData?.coin.websiteUrl && (
            <div>
              WebsiteUrl -{" "}
              <Link
                href={coinData?.coin.websiteUrl}
                target="_blank"
                className="font-semibold underline text-rose-400"
              >
                {coinData?.coin.websiteUrl}
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CoinPage;
