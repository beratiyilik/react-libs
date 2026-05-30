"use client";
import type { ChangeEvent, ReactNode } from "react";
import { ToggleSwitch, SearchBox } from "@beratiyilik/react-components";
import {
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPaginationSelect,
  StyledPaginationPageInfo,
  StyledTableSummaryContainer,
  StyledTableSummaryText,
  StyledTableSummaryDebug,
} from "../styled/index.js";
import { PAGE_SIZE_OPTIONS } from "../hooks/index.js";
import type { FilterState, SortState, FieldOption } from "../types/index.js";

export { ToggleSwitch, SearchBox };

export const Pagination = ({
  passive,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalPages,
}: {
  passive: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
}) => {
  if (passive) return null;
  return (
    <StyledPaginationContainer>
      <StyledPaginationButton
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      >
        ‹
      </StyledPaginationButton>
      <StyledPaginationButton
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      >
        ›
      </StyledPaginationButton>
      <StyledPaginationSelect
        value={pageSize}
        onChange={({ target }: ChangeEvent<HTMLSelectElement>) =>
          setPageSize(parseInt(target.value))
        }
      >
        {PAGE_SIZE_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </StyledPaginationSelect>
      <StyledPaginationPageInfo>
        {currentPage} / {totalPages}
      </StyledPaginationPageInfo>
    </StyledPaginationContainer>
  );
};

export const TableSummary = <T extends Record<string, unknown>>({
  passive,
  debug = false,
  fieldOptions,
  data,
  searchTerm,
  filters,
  sort,
  lengthOfFilteredData,
}: {
  passive: boolean;
  debug?: boolean;
  fieldOptions: FieldOption<T>[];
  data: T[];
  searchTerm: string;
  filters: FilterState[];
  sort: Partial<SortState>;
  lengthOfFilteredData: number;
}) => {
  if (passive) return null;

  const hasActiveFilters = filters.length > 0 || searchTerm !== "";
  const shownCount = hasActiveFilters ? lengthOfFilteredData : data.length;

  const getFilterHeaderName = (fn: string) =>
    fieldOptions.find(({ fieldName, filterFieldName }) =>
      filterFieldName ? filterFieldName === fn : fieldName === fn,
    )?.headerName ?? fn;

  const getSortedHeaderName = (fn: string) =>
    fieldOptions.find(({ fieldName, sortFieldName }) =>
      sortFieldName ? sortFieldName === fn : fieldName === fn,
    )?.headerName ?? fn;

  const filterMessage =
    filters.length > 0
      ? filters.map(({ field, value }) => `${getFilterHeaderName(field)}: ${value}`).join(", ")
      : "";

  const sortMessage = sort.field ? `${getSortedHeaderName(sort.field)} ${sort.direction}` : "";

  return (
    <StyledTableSummaryContainer>
      <StyledTableSummaryText>
        {hasActiveFilters
          ? `Showing ${shownCount} of ${data.length} records`
          : `${data.length} records`}
      </StyledTableSummaryText>
      {debug && filterMessage !== "" && (
        <StyledTableSummaryDebug>Filtered by {filterMessage}</StyledTableSummaryDebug>
      )}
      {debug && searchTerm !== "" && (
        <StyledTableSummaryDebug>Search: {searchTerm}</StyledTableSummaryDebug>
      )}
      {debug && sortMessage !== "" && (
        <StyledTableSummaryDebug>Sort: {sortMessage}</StyledTableSummaryDebug>
      )}
    </StyledTableSummaryContainer>
  );
};

export const ComponentRenderer = ({
  component,
  row,
}: {
  component: ReactNode | ((row: Record<string, unknown>) => ReactNode);
  row?: Record<string, unknown>;
}): ReactNode => {
  if (typeof component === "function") return component(row ?? {});
  if (typeof component === "string") return <>{component}</>;
  return component ?? null;
};
