"use client";
import {
  StyledTableSummaryContainer,
  StyledTableSummaryText,
  StyledTableSummaryDebug,
} from "../../styled/index.js";
import type { FilterState, SortState, FieldOption } from "../../types/index.js";

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
