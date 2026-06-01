import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../theme/index.js";
import { ToggleSwitch } from "./ToggleSwitch.js";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

describe("ToggleSwitch", () => {
  it("renders a checkbox", () => {
    render(<ToggleSwitch selected={false} onChange={vi.fn()} />, { wrapper });
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    cleanup();
  });

  it("is checked when selected is true", () => {
    render(<ToggleSwitch selected={true} onChange={vi.fn()} />, { wrapper });
    expect(screen.getByRole("checkbox")).toBeChecked();
    cleanup();
  });

  it("is unchecked when selected is false", () => {
    render(<ToggleSwitch selected={false} onChange={vi.fn()} />, { wrapper });
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    cleanup();
  });

  it("calls onChange when clicked", () => {
    const onChange = vi.fn();
    render(<ToggleSwitch selected={false} onChange={onChange} />, { wrapper });
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
    cleanup();
  });
});
