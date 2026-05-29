"use client";
import { ToggleSwitch } from "../shared.components.js";

export const HeaderSelection = ({
  passive,
  toggleAll,
  isAllSelected,
}: {
  passive: boolean;
  toggleAll: () => void;
  isAllSelected: boolean;
}) => {
  if (passive) return null;
  return (
    <ToggleSwitch
      selected={isAllSelected}
      onChange={toggleAll}
    />
  );
};
