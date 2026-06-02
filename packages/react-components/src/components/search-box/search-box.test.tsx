import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../theme/index.js";
import { SearchBox } from "./search-box.js";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

describe("SearchBox", () => {
  it("renders search input", () => {
    render(<SearchBox />, { wrapper });
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    cleanup();
  });

  it("displays controlled value", () => {
    render(<SearchBox value="hello" onChange={vi.fn()} />, { wrapper });
    expect(screen.getByRole("searchbox")).toHaveValue("hello");
    cleanup();
  });

  it("calls onChange on input change (controlled)", () => {
    const onChange = vi.fn();
    render(<SearchBox value="" onChange={onChange} />, { wrapper });
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "world" } });
    expect(onChange).toHaveBeenCalledWith("world");
    cleanup();
  });

  it("associates a visible label with the input", () => {
    render(<SearchBox label="Find" />, { wrapper });
    expect(screen.getByRole("searchbox", { name: "Find" })).toBeInTheDocument();
    cleanup();
  });

  it("falls back to placeholder as accessible name when no label", () => {
    render(<SearchBox placeholder="Search users" />, { wrapper });
    expect(screen.getByRole("searchbox", { name: "Search users" })).toBeInTheDocument();
    cleanup();
  });

  it("forwards ref to the input", () => {
    let node: HTMLInputElement | null = null;
    render(
      <SearchBox
        ref={(el) => {
          node = el;
        }}
      />,
      { wrapper },
    );
    expect(node).toBeInstanceOf(HTMLInputElement);
    cleanup();
  });

  it("renders nothing when passive is true", () => {
    const { container } = render(<SearchBox passive />, { wrapper });
    expect(container).toBeEmptyDOMElement();
    cleanup();
  });
});
