"use client";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import {
  StyledTh,
  StyledHeaderContainer,
  StyledSortAndNameContainer,
  StyledHeaderName,
} from "../../styled/index.js";
import { Sort } from "./sort.component.js";
import { Filter } from "./filter.component.js";
import type { FilterState, SortState, FieldOption } from "../../types/index.js";

export const HeaderCell = <T extends Record<string, unknown>>({
  fieldName,
  headerName,
  sortable,
  sortFieldName,
  filterable,
  filterFieldName,
  selection,
  sort,
  setSort,
  filters,
  setFilters,
  selectionComponent,
}: FieldOption<T> & {
  sort: Partial<SortState>;
  setSort: Dispatch<SetStateAction<Partial<SortState>>>;
  filters: FilterState[];
  setFilters: Dispatch<SetStateAction<FilterState[]>>;
  selectionComponent?: ReactNode;
}) => {
  const _sortFieldName = sortFieldName ?? fieldName;
  const _filterFieldName = filterFieldName ?? fieldName;
  const filter = filters.find(({ field }) => field === _filterFieldName) ?? {
    field: _filterFieldName,
    value: "",
  };

  const setFilter = (f: FilterState) => {
    setFilters((current) => {
      const filtered = current.filter(({ field }) => field !== f.field);
      return f.value ? [...filtered, f] : filtered;
    });
  };

  return (
    <StyledTh>
      <StyledHeaderContainer>
        <StyledSortAndNameContainer>
          <StyledHeaderName>{headerName ?? fieldName}</StyledHeaderName>
          <Sort field={_sortFieldName} passive={!sortable} sort={sort} setSort={setSort} />
        </StyledSortAndNameContainer>
        <Filter
          field={_filterFieldName}
          passive={!filterable}
          filter={filter}
          setFilter={setFilter}
        />
        {selection && selectionComponent}
      </StyledHeaderContainer>
    </StyledTh>
  );
};
