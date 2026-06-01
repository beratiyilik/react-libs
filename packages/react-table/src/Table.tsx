"use client";
import { TableProvider } from "./context/Table.context.js";
import {
  TopSection,
  HeaderSection,
  BodySection,
  FooterSection,
} from "./components/sections/index.js";
import { StyledTableContainer, StyledTable } from "./styled/index.js";
import type { TableOptions } from "./types/index.js";

export type TableProps<T extends Record<string, unknown>> = {
  options: TableOptions<T>;
  data: T[];
};

export const Table = <T extends Record<string, unknown>>({ options, data }: TableProps<T>) => (
  <TableProvider options={options} data={data}>
    <StyledTableContainer>
      <StyledTable>
        <TopSection />
        <HeaderSection />
        <BodySection />
        <FooterSection />
      </StyledTable>
    </StyledTableContainer>
  </TableProvider>
);
