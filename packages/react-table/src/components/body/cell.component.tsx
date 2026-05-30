"use client";
import { StyledTd } from "../../styled/index.js";
import { ToggleSwitch } from "../shared.components.js";
import { ComponentRenderer } from "../shared.components.js";
import type { FieldOption } from "../../types/index.js";

export const BodyCell = <T extends Record<string, unknown>>({
  row,
  fieldOption,
  toggle,
  isSelected,
}: {
  row: T;
  fieldOption: FieldOption<T>;
  toggle: (row: T) => void;
  isSelected: (row: T) => boolean;
}) => {
  const { fieldName, headerName, render, selection } = fieldOption;
  if (selection)
    return (
      <StyledTd data-label={headerName ?? fieldName}>
        <ToggleSwitch selected={isSelected(row)} onChange={() => toggle(row)} size="sm" />
      </StyledTd>
    );
  return (
    <StyledTd data-label={headerName ?? fieldName}>
      <ComponentRenderer
        component={render ? render(row) : (row[fieldName] as string)}
        row={row as Record<string, unknown>}
      />
    </StyledTd>
  );
};
