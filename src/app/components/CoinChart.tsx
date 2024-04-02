import { FC, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { CoinChartData } from "../types";
import chartLineIcon from "./assets/line-chart-svgrepo-com.svg";
import barChartIcon from "./assets/bar-chart-svgrepo-com.svg";
import {
  generateRandomSignals,
  getLabels,
  getAxisName,
  getLabelsBar,
} from "../utils/helpers";
import Image from "next/image";

Chart.register(...registerables);

interface CoinChartProps {
  data: CoinChartData | null;
  interval: string;
  coinName: string;
}

const CoinChart: FC<CoinChartProps> = ({ data, interval, coinName }) => {
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const toggleChartType = (type: "line" | "bar") => {
    setChartType(type);
  };
  const lastChanges = data?.history;
  const prices = lastChanges?.map((item) =>
    Number(parseFloat(item.price).toFixed(2))
  );

  const signals = {
    buy: generateRandomSignals(5, prices || [], getLabels(interval).length),
    sell: generateRandomSignals(5, prices || [], getLabels(interval).length),
  };
  const labelsInterval = getLabels(interval);
  const labelsIntervalBar = getLabelsBar(interval);

  const chartData: ChartData<
    "line",
    number[][] | number[] | { x: number; y: number }[],
    unknown
  > = {
    labels: labelsInterval,
    datasets: [
      {
        label: `Price History of ${coinName}`,
        data: prices || [],
        borderColor: "#16C784",
        backgroundColor: "#16C784",
        type: "line",
        pointRadius: 0,
      },
      {
        label: "Buy Signals",
        data: signals.buy.map((signal) => ({
          y: signal.price,
          x: signal.timestamp,
        })),
        type: "line",
        showLine: false,
        pointBackgroundColor: "green",
        pointBorderColor: "green",
        backgroundColor: "green",

        pointRadius: 6,
      },
      {
        label: "Sell Signals",
        data: signals?.sell.map((signal) => ({
          x: signal.timestamp,
          y: signal.price,
        })),
        type: "line",
        showLine: false,
        pointBackgroundColor: "red",
        pointBorderColor: "red",
        backgroundColor: "red",
        pointRadius: 8,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        ticks: {
          stepSize: 5,
        },
      },
      y: {
        type: "linear",
      },
    },
  };

  const barchartData: ChartData<"bar", number[], unknown> = {
    labels: labelsIntervalBar,
    datasets: [
      {
        label: `Price History of ${coinName}`,
        data: prices || [],
        borderColor: "rgba(22, 199, 132, 0.5)",
        backgroundColor: "rgba(22, 199, 132, 0.5)",
        type: "bar",
      },
    ],
  };

  const barchartOptions: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        ticks: {
          stepSize: 5,
        },
      },
      y: {
        type: "linear",
      },
    },
  };

  return (
    <div className="w-full h-full relative">
      <div className="flex justify-center my-4">
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
            width={40}
            height={40}
          />
        </button>
        <button
          data-testid="bar-chart-button"
          className={`mx-2 p-2 rounded border ${
            chartType === "bar" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => toggleChartType("bar")}
        >
          <Image
            src={barChartIcon}
            alt="bar Chart Icon"
            width={40}
            height={40}
          />
        </button>
      </div>
      {chartType === "line" ? (
        <Line
          data-testid="line-chart"
          data={chartData}
          options={chartOptions}
        />
      ) : (
        <Bar
          data-testid="bar-chart"
          data={barchartData}
          options={barchartOptions}
        />
      )}
    </div>
  );
};

export default CoinChart;
