import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@beratiyilik/react-components";
import { Table } from "./table.js";

type User = { id: number; name: string; role: string };

const data: User[] = [
  { id: 1, name: "Berat", role: "Engineer" },
  { id: 2, name: "Alice", role: "Designer" },
];

const options = {
  name: "Users",
  fieldOptions: [
    { fieldName: "name" as const, headerName: "Name" },
    { fieldName: "role" as const, headerName: "Role" },
  ],
  searchable: false,
  pagination: false,
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);

describe("Table", () => {
  it("renders column headers", () => {
    render(<Table options={options} data={data} />, { wrapper });
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    cleanup();
  });

  it("renders rows", () => {
    render(<Table options={options} data={data} />, { wrapper });
    expect(screen.getAllByText("Berat").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Alice").length).toBeGreaterThan(0);
    cleanup();
  });
});
