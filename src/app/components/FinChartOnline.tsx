"use client";
import React, { useState, useEffect, FC } from "react";
import Binance from "binance-api-node";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CandleData {
  x: number;
  y: [number, number, number, number];
}

interface FinancialChartData {
  symbol: string;
}

const FinancialChart: FC<FinancialChartData> = ({ symbol }) => {
  const [chartData, setChartData] = useState<CandleData[]>([]);

  useEffect(() => {
    const client = Binance();

    const handleCandleUpdate = (candle: any) => {
      setChartData((prevData) => [
        ...prevData,
        {
          x: candle.eventTime,
          y: [
            parseFloat(candle.open),
            parseFloat(candle.high),
            parseFloat(candle.low),
            parseFloat(candle.close),
          ],
        },
      ]);
    };

    client.ws.candles(`${symbol}USDT`, "1m", handleCandleUpdate);

    return () => {};
  }, [symbol]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 500,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: (val: number): string | string[] => `$${val}`,
      },
    },
  };

  const series: ApexAxisChartSeries = [
    {
      name: "Coin",
      data: chartData,
    },
  ];

  return (
    <div className="financial-chart w-full container">
      <h2 className="text-2xl text-center my-6">
        Online price data for {symbol} to USDT
      </h2>
      <ApexChart
        options={chartOptions}
        series={series}
        type="candlestick"
        width={"100%"}
        height={"500px"}
      />
    </div>
  );
};

export default FinancialChart;
