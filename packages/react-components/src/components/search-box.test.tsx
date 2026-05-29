import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../theme/index.js";
import { SearchBox } from "./search-box.js";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

describe("SearchBox", () => {
  it("renders search input", () => {
    render(<SearchBox searchTerm="" setSearchTerm={vi.fn()} />, { wrapper });
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    cleanup();
  });

  it("displays current search term", () => {
    render(<SearchBox searchTerm="hello" setSearchTerm={vi.fn()} />, { wrapper });
    expect(screen.getByRole("textbox")).toHaveValue("hello");
    cleanup();
  });

  it("calls setSearchTerm on input change", () => {
    const setSearchTerm = vi.fn();
    render(<SearchBox searchTerm="" setSearchTerm={setSearchTerm} />, { wrapper });
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "world" } });
    expect(setSearchTerm).toHaveBeenCalledWith("world");
    cleanup();
  });

  it("renders nothing when passive is true", () => {
    const { container } = render(<SearchBox searchTerm="" setSearchTerm={vi.fn()} passive />, {
      wrapper,
    });
    expect(container).toBeEmptyDOMElement();
    cleanup();
  });
});
