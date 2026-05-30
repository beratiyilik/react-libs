"use client";
import { StyledFilterToggleButton } from "../../styled/index.js";
import type { FilterState } from "../../types/index.js";

const FilterIcon = ({ active }: { active: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? 2.5 : 2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const Filter = ({
  passive,
  filter,
  onToggle,
}: {
  field: string;
  passive: boolean;
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
  onToggle?: () => void;
}) => {
  if (passive) return null;

  const isActive = filter.value !== "";

  return (
    <StyledFilterToggleButton
      $active={isActive}
      onClick={onToggle}
      title={isActive ? "Filter active" : "Filter"}
    >
      <FilterIcon active={isActive} />
    </StyledFilterToggleButton>
  );
};
