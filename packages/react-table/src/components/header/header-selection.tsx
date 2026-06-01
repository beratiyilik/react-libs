"use client";
import { Checkbox } from "@beratiyilik/react-components";

export const HeaderSelection = ({
  passive,
  toggleAll,
  isAllSelected,
  isPartiallySelected,
}: {
  passive: boolean;
  toggleAll: () => void;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
}) => {
  if (passive) return null;
  return (
    <Checkbox
      size="sm"
      checked={isAllSelected}
      indeterminate={isPartiallySelected}
      onChange={toggleAll}
      aria-label="Select all rows"
    />
  );
};
