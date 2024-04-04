"use client";
import React, { FC } from "react";
import Link from "next/link";
import FinancialChart from "@/app/components/FinancialChart";
import Loader from "@/app/components/common/Loader";
import FailedAlert from "@/app/components/common/FailedAlert";
import { useCoinData } from "@/app/hooks/useCoinsData";

const CoinPage: FC<{ params: { slug: string } }> = ({ params }) => {
  const slug = params.slug;

  const { currencies, handleChangeInterval, interval, isError, isLoading } =
    useCoinData(slug);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <FailedAlert />;
  }

  return (
    <section className="container flex flex-col py-4 md:py-8 lg:py-12 ">
      <Link
        href={"/"}
        className="rounded bg-indigo-500 px-2 py-1 w-fit text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Back to coin list
      </Link>
      <div className="flex flex-1 items-center justify-center gap-2  mb-20 mx-auto w-full">
        <button
          className={`interval-btn ${interval === "1d" && "ring-2"}`}
          onClick={() => handleChangeInterval("1d", "15m")}
        >
          1 day
        </button>
        <button
          className={`interval-btn ${interval === "7d" && "ring-2"}`}
          onClick={() => handleChangeInterval("7d", "4h")}
        >
          1 week
        </button>
        <button
          className={`interval-btn ${interval === "30d" && "ring-2"}`}
          onClick={() => handleChangeInterval("30d", "12h")}
        >
          1 Month
        </button>
      </div>

      <div className="w-full h-[500px] container">
        <FinancialChart data={currencies} interval={interval} />
      </div>
    </section>
  );
};

export default CoinPage;
