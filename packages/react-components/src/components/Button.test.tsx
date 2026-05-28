import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Button } from "./Button.js";
import { defaultTheme } from "../theme/index.js";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>, { wrapper });
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    cleanup();
  });

  it("forwards disabled prop", () => {
    render(<Button disabled>Disabled</Button>, { wrapper });
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    cleanup();
  });
});
