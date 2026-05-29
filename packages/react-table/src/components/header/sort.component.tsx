"use client";
import type { Dispatch, SetStateAction } from "react";
import { StyledSortButton } from "../../styled/index.js";
import type { SortState } from "../../types/index.js";

export const Sort = ({
  field,
  passive,
  sort,
  setSort,
}: {
  field: string;
  passive: boolean;
  sort: Partial<SortState>;
  setSort: Dispatch<SetStateAction<Partial<SortState>>>;
}) => {
  if (passive) return null;
  return (
    <StyledSortButton
      onClick={() =>
        setSort({
          field,
          direction:
            sort.field === field && sort.direction === "asc" ? "desc" : "asc",
        })
      }
    >
      {sort.field === field && sort.direction === "asc" ? "▲" : "▼"}
    </StyledSortButton>
  );
};
