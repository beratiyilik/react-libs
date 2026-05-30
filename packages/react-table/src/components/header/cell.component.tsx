"use client";
import { useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import {
  StyledTh,
  StyledHeaderContainer,
  StyledSortAndNameContainer,
  StyledHeaderName,
  StyledFilterInputWrapper,
  StyledFilterInput,
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
  const [filterOpen, setFilterOpen] = useState(false);

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

  const showInput = filterOpen || filter.value !== "";

  return (
    <StyledTh>
      <StyledHeaderContainer>
        <StyledSortAndNameContainer>
          <StyledHeaderName>{headerName ?? fieldName}</StyledHeaderName>
          <Sort field={_sortFieldName} passive={!sortable} sort={sort} setSort={setSort} />
          <Filter
            field={_filterFieldName}
            passive={!filterable}
            filter={filter}
            setFilter={setFilter}
            onToggle={() => setFilterOpen((prev) => !prev)}
          />
          {selection && selectionComponent}
        </StyledSortAndNameContainer>
        {filterable && showInput && (
          <StyledFilterInputWrapper>
            <StyledFilterInput
              type="text"
              autoFocus
              value={filter.value}
              placeholder="Filter..."
              onChange={({ target }) => setFilter({ field: _filterFieldName, value: target.value })}
            />
          </StyledFilterInputWrapper>
        )}
      </StyledHeaderContainer>
    </StyledTh>
  );
};
