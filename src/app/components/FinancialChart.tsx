"use client";
import { ApexOptions } from "apexcharts";
import { FinancialChartProps } from "../types";
import { getIntervalMilliseconds, signalsData } from "../utils/helpers";
import { useState } from "react";
import chartLineIcon from "./assets/line-chart-svgrepo-com.svg";
import barChartIcon from "./assets/bar-chart-svgrepo-com.svg";
import Image from "next/image";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FinancialChart = ({ data, interval = "1d" }: FinancialChartProps) => {
  const [chartType, setChartType] = useState<"line" | "candlestick">(
    "candlestick"
  );

  const toggleChartType = (type: "line" | "candlestick") => {
    setChartType(type);
  };
  const currentDate = new Date();
  const intervalInMilliseconds = getIntervalMilliseconds(interval);
  const startDate = new Date(currentDate.getTime() - intervalInMilliseconds);

  const filteredData = data.filter((item) => new Date(item.x) >= startDate);
  const signalData = signalsData({ filteredData });
  const options: ApexOptions = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "red" } },
      axisBorder: { show: true, color: "red" },
      axisTicks: { show: true, color: "red" },
    },
    yaxis: {
      labels: { style: { colors: "red" } },
      axisBorder: { show: true, color: "red" },
      axisTicks: { show: true, color: "red" },
    },
    annotations: {
      points: signalData,
    },
  };

  const series: ApexAxisChartSeries = [
    {
      name: "Coin",
      data: filteredData,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-5 lg:gap-10 w-full h-full">
      <div className="flex justify-center">
        <button
          data-testid="line-chart-button"
          className={`mx-2 p-2 rounded border ${
            chartType === "line" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => toggleChartType("line")}
        >
          <Image
            src={chartLineIcon}
            alt="chartLineIcon"
            width={30}
            height={30}
          />
        </button>
        <button
          data-testid="bar-chart-button"
          className={`mx-2 p-2 rounded border ${
            chartType === "candlestick" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => toggleChartType("candlestick")}
        >
          <Image
            src={barChartIcon}
            alt="bar Chart Icon"
            width={30}
            height={30}
          />
        </button>
      </div>
      {typeof window !== "undefined" && (
        <>
          {chartType === "candlestick" && (
            <div className="w-full h-fit">
              <ApexChart
                options={options}
                series={series}
                type={"candlestick"}
                height={500}
                width={"100%"}
              />
            </div>
          )}
          {chartType === "line" && (
            <div className="w-full h-fit">
              <ApexChart
                options={options}
                series={series}
                type={"line"}
                height={500}
                width={"100%"}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FinancialChart;
