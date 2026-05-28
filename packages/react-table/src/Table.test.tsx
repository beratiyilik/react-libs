import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@beratiyilik/react-components";
import { Table } from "./Table.js";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

describe("Table", () => {
  it("renders column headers", () => {
    render(<Table columns={["Name", "Role"]} rows={[]} />, { wrapper });
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    cleanup();
  });

  it("renders rows", () => {
    render(
      <Table columns={["Name"]} rows={[["Berat"], ["Alice"]]} />,
      { wrapper }
    );
    expect(screen.getByText("Berat")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    cleanup();
  });
});
