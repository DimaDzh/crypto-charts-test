import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "jest-canvas-mock"; // Import jest-canvas-mock
import CoinChart from "@/app/components/CoinChart";
import { CoinChartData } from "@/app/types";

// Mock data for testing
const mockData: CoinChartData = {
  change: "positive",
  history: [
    { price: "100", timestamp: 1638743819000 },
    { price: "110", timestamp: 1638743819001 },
    { price: "120", timestamp: 1638743819002 },
  ],
};

test("renders CoinChart component with line chart by default", () => {
  render(<CoinChart data={mockData} interval="24h" coinName="Bitcoin" />);

  // Check if line chart is rendered by default
  const lineChartElement = screen.getByTestId("line-chart");
  expect(lineChartElement).toBeInTheDocument();

  // Check if bar chart is not rendered initially
  const barChartElement = screen.queryByTestId("bar-chart");
  expect(barChartElement).not.toBeInTheDocument();
});

test("toggle between line and bar chart on button click", () => {
  render(<CoinChart data={mockData} interval="24h" coinName="Bitcoin" />);

  // Check if line chart is rendered initially
  const lineChartElement = screen.getByTestId("line-chart");
  expect(lineChartElement).toBeInTheDocument();

  // Click on the bar chart button
  const barChartButton = screen.getByTestId("bar-chart-button");
  fireEvent.click(barChartButton);

  // Check if line chart is no longer rendered
  const updatedLineChartElement = screen.queryByTestId("line-chart");
  expect(updatedLineChartElement).not.toBeInTheDocument();

  // Check if bar chart is rendered after button click
  const barChartElement = screen.getByTestId("bar-chart");
  expect(barChartElement).toBeInTheDocument();
});
