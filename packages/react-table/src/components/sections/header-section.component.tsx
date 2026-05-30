"use client";
import { useMemo } from "react";
import { useTable } from "../../context/table.context.js";
import { StyledThead, StyledTr } from "../../styled/index.js";
import { HeaderCell } from "../header/index.js";
import { HeaderSelection } from "../header/index.js";

export const HeaderSection = () => {
  const {
    options: { fieldOptions },
    filters: { filters, setFilters },
    sort: { sort, setSort },
    selection: { toggleAll, isSelectedAll },
  } = useTable();

  const memoizedHeaderSelection = useMemo(
    () => <HeaderSelection passive={false} toggleAll={toggleAll} isAllSelected={isSelectedAll} />,
    [toggleAll, isSelectedAll],
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
