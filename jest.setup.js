import "@testing-library/jest-dom";
import "resize-observer-polyfill"; // Import the polyfill
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
