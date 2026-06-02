"use client";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@beratiyilik/react-components";
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
  const isAsc = sort.field === field && sort.direction === "asc";
  return (
    <Button
      iconOnly
      size="sm"
      variant="ghost"
      onClick={() => setSort({ field, direction: isAsc ? "desc" : "asc" })}
      aria-label={isAsc ? `Sort ${field} descending` : `Sort ${field} ascending`}
    >
      {isAsc ? "▲" : "▼"}
    </Button>
  );
};
