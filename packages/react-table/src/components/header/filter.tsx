"use client";
import { useTheme } from "styled-components";
import { Button } from "@beratiyilik/react-components";
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
  passive: boolean;
  filter: FilterState;
  onToggle?: () => void;
}) => {
  const theme = useTheme();
  if (passive) return null;

  const isActive = filter.value !== "";

  return (
    <Button
      iconOnly
      size="sm"
      variant="ghost"
      aria-label={isActive ? "Filter active" : "Filter"}
      aria-pressed={isActive}
      style={{ color: isActive ? theme.colors.primary : theme.colors.mutedForeground }}
      {...(onToggle !== undefined && { onClick: onToggle })}
    >
      <FilterIcon active={isActive} />
    </Button>
  );
};
