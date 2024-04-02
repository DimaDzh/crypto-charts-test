import { Signal } from "../types";

export const generateRandomSignals = (
  numSignals: number,
  prices: number[],
  interval: number
): Signal[] => {
  const signals: Signal[] = [];

  for (let i = 0; i < numSignals; i++) {
    const timestamp = Math.floor(Math.random() * interval);
    const randomIndex = Math.floor(Math.random() * prices.length);
    const price = prices[randomIndex];
    const minVolume = 1 * price;
    const maxVolume = 1.01 * price;
    const volume = Math.random() * (maxVolume - minVolume) + minVolume;
    signals.push({ timestamp, price, volume });
  }
  return signals;
};

export const getLabels = (interval: string) => {
  switch (interval) {
    case "24h":
      return Array.from({ length: 288 }, (_, i) => i + 1);
    case "7d":
      return Array.from({ length: 168 }, (_, i) => i + 1);
    case "30d":
      return Array.from({ length: 720 }, (_, i) => i + 1);
    default:
      return [];
  }
};
export const getLabelsBar = (interval: string) => {
  switch (interval) {
    case "24h":
      return Array.from({ length: 24 }, (_, i) => i + 1);
    case "7d":
      return Array.from({ length: 56 }, (_, i) => i + 1);
    case "30d":
      return Array.from({ length: 30 }, (_, i) => i + 1);
    default:
      return [];
  }
};

export const getAxisName = (interval: string) => {
  switch (interval) {
    case "24h":
      return "Hours";
    case "7d":
    case "30d":
      return "Days";
    default:
      return "";
  }
};
