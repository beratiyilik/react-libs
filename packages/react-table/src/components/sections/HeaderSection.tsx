"use client";
import { useMemo } from "react";
import { useTable } from "../../context/Table.context.js";
import { StyledThead, StyledTr } from "../../styled/index.js";
import { HeaderCell, HeaderSelection } from "../header/index.js";

export const HeaderSection = () => {
  const {
    options: { fieldOptions },
    filters: { filters, setFilters },
    sort: { sort, setSort },
    selection: { toggleAll, isSelectedAll, data: selectedRows },
  } = useTable();

  const isPartiallySelected = selectedRows.length > 0 && !isSelectedAll;

  const memoizedHeaderSelection = useMemo(
    () => (
      <HeaderSelection
        passive={false}
        toggleAll={toggleAll}
        isAllSelected={isSelectedAll}
        isPartiallySelected={isPartiallySelected}
      />
    ),
    [toggleAll, isSelectedAll, isPartiallySelected],
  );

  return (
    <StyledThead>
      <StyledTr>
        {fieldOptions.map((fieldOption, index) => (
          <HeaderCell
            key={index}
            {...fieldOption}
            sort={sort}
            setSort={setSort}
            filters={filters}
            setFilters={setFilters}
            selectionComponent={memoizedHeaderSelection}
          />
        ))}
      </StyledTr>
    </StyledThead>
  );
};
