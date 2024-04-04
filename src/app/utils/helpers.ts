import { Intervals, SignalFunctionDataType } from "../types";
import upArrow from "../components/assets/icon-arrow-up.svg";
import downArrow from "../components/assets/icon-down-arrow.svg";

export const signalsData = ({
  filteredData,
  buyIndex1 = 12,
  buyIndex2 = 45,
  sellIndex1 = 20,
  sellIndex2 = 76,
}: SignalFunctionDataType) => {
  const dataLength = filteredData.length;

  if (
    buyIndex1 >= dataLength ||
    buyIndex2 >= dataLength ||
    sellIndex1 >= dataLength ||
    sellIndex2 >= dataLength
  ) {
    console.error(
      "Invalid signal indexes. Please provide indexes within the filtered data range."
    );
    return [];
  }

  const buy1 = {
    x: filteredData[buyIndex1].x.getTime(),
    y: filteredData[buyIndex1].y[2],
    label: {
      text: "Buy",
      borderColor: "transparent",
      style: {
        color: "green",
      },
    },
    marker: {
      size: 0,
    },
    image: {
      path: upArrow.src,
      width: 20,
      height: 20,
      offsetX: 0,
      offsetY: 10,
    },
  };

  const buy2 = {
    x: filteredData[buyIndex2].x.getTime(),
    y: filteredData[buyIndex2].y[2],
    label: {
      text: "Buy",
      borderColor: "transparent",
      style: {
        color: "green",
      },
    },
    marker: {
      size: 0,
    },
    image: {
      path: upArrow.src,
      width: 20,
      height: 20,
      offsetX: 0,
      offsetY: 10,
    },
  };

  const sell1 = {
    x: filteredData[sellIndex1].x.getTime(),
    y: filteredData[sellIndex1].y[2],
    label: {
      text: "Sell",
      borderColor: "transparent",
      style: {
        color: "red",
      },
    },
    marker: {
      size: 0,
    },
    image: {
      path: downArrow.src,
      width: 20,
      height: 20,
      offsetX: 0,
      offsetY: 10,
    },
  };

  const sell2 = {
    x: filteredData[sellIndex2].x.getTime(),
    y: filteredData[sellIndex2].y[sellIndex2],
    label: {
      text: "Sell",
      borderColor: "transparent",
      style: {
        color: "red",
      },
    },
    marker: {
      size: 0,
    },
    image: {
      path: downArrow.src,
      width: 20,
      height: 20,
      offsetX: 0,
      offsetY: 10,
    },
  };

  return [buy1, buy2, sell1, sell2];
};

export const getIntervalMilliseconds = (interval: Intervals): number => {
  switch (interval) {
    case "1d":
      return 1 * 24 * 60 * 60 * 1000;
    case "7d":
      return 7 * 24 * 60 * 60 * 1000;
    case "30d":
      return 30 * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};
