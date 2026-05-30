"use client";
import type { ChangeEvent, ReactNode } from "react";
import {
  StyledToggleSwitchLabel,
  StyledToggleSwitchInput,
  StyledToggleSwitchSlider,
  StyledSearchBoxContainer,
  StyledSearchBoxLabel,
  StyledSearchBoxInput,
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPaginationSelect,
  StyledPaginationPageInfo,
  StyledTableSummaryContainer,
  StyledTableSummaryRow,
  StyledTableSummaryColumn,
} from "../styled/index.js";
import { PAGE_SIZE_OPTIONS } from "../hooks/index.js";
import type { FilterState, SortState, FieldOption } from "../types/index.js";

export const ToggleSwitch = ({
  selected,
  onChange,
}: {
  selected: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <StyledToggleSwitchLabel>
    <StyledToggleSwitchInput type="checkbox" checked={selected} onChange={onChange} />
    <StyledToggleSwitchSlider $checked={selected} />
  </StyledToggleSwitchLabel>
);

export const SearchBox = ({
  passive,
  searchTerm,
  setSearchTerm,
}: {
  passive: boolean;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}) => {
  if (passive) return null;
  return (
    <StyledSearchBoxContainer>
      <StyledSearchBoxLabel htmlFor="search">Search</StyledSearchBoxLabel>
      <StyledSearchBoxInput
        id="search"
        type="text"
        value={searchTerm}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => setSearchTerm(target.value)}
      />
    </StyledSearchBoxContainer>
  );
};

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
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </StyledPaginationButton>
      <StyledPaginationButton
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
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
  fieldOptions,
  data,
  searchTerm,
  filters,
  sort,
  lengthOfFilteredData,
}: {
  passive: boolean;
  fieldOptions: FieldOption<T>[];
  data: T[];
  searchTerm: string;
  filters: FilterState[];
  sort: Partial<SortState>;
  lengthOfFilteredData: number;
}) => {
  if (passive) return null;

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
      ? filters.map(({ field, value }) => `${getFilterHeaderName(field)}: ${value}`).join(" and ")
      : "";

  const sortMessage = sort.field
    ? `Sorted by ${getSortedHeaderName(sort.field)} ${sort.direction}`
    : "";

  return (
    <StyledTableSummaryContainer>
      <StyledTableSummaryRow>
        <StyledTableSummaryColumn $content={true}>
          Total {data.length} rows
        </StyledTableSummaryColumn>
        <StyledTableSummaryColumn $content={filters.length > 0}>
          {filters.length > 0 && `(${lengthOfFilteredData} rows after filter and search)`}
        </StyledTableSummaryColumn>
        <StyledTableSummaryColumn $content={searchTerm !== ""}>
          {searchTerm !== "" ? `Searched for ${searchTerm}` : ""}
        </StyledTableSummaryColumn>
      </StyledTableSummaryRow>
      <StyledTableSummaryRow>
        <StyledTableSummaryColumn $content={filterMessage !== ""}>
          {filterMessage !== "" ? `Filtered by ${filterMessage}` : ""}
        </StyledTableSummaryColumn>
        <StyledTableSummaryColumn $content={sortMessage !== ""}>
          {sortMessage}
        </StyledTableSummaryColumn>
      </StyledTableSummaryRow>
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
