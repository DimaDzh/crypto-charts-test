import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import FinancialChart from "@/app/components/FinancialChart";

const mockData = [
  { x: new Date(2024, 3, 31), y: [100, 105, 98, 102] },
  { x: new Date(2024, 3, 30), y: [95, 102, 90, 98] },
  { x: new Date(2024, 3, 29), y: [90, 97, 88, 92] },
];

jest.mock("react-apexcharts");

describe("FinancialChart component", () => {
  it("should render a candlestick chart by default with toggle buttons of char-button", () => {
    render(<FinancialChart data={mockData} interval={"1d"} />);
    expect(screen.getByTestId("candlestick-chart-button")).toBeInTheDocument();
    expect(screen.getByTestId("line-chart-button")).toBeInTheDocument();
  });

  it("should render a line chart when the button is clicked", () => {
    render(<FinancialChart data={mockData} interval={"1d"} />);
    const lineChartButton = screen.getByTestId("line-chart-button");
    fireEvent.click(lineChartButton);
    expect(screen.getByTestId("line-chart-button")).toHaveClass("bg-gray-200");
    expect(screen.getByTestId("candlestick-chart-button")).toHaveClass(
      "bg-white"
    );
  });
  it("should render a candlestick chart when the button is clicked", () => {
    render(<FinancialChart data={mockData} interval={"1d"} />);
    const lineChartButton = screen.getByTestId("candlestick-chart-button");
    fireEvent.click(lineChartButton);
    expect(screen.getByTestId("line-chart-button")).toHaveClass("bg-white");
    expect(screen.getByTestId("candlestick-chart-button")).toHaveClass(
      "bg-gray-200"
    );
  });
});
