"use client";
import { StyledTd } from "../../styled/index.js";
import { Checkbox, ComponentRenderer } from "../shared.components.js";
import { useTable } from "../../context/table.context.js";
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
  const { density } = useTable();
  const { fieldName, headerName, render, selection } = fieldOption;
  if (selection)
    return (
      <StyledTd $density={density} data-label={headerName ?? fieldName}>
        <Checkbox
          size="sm"
          checked={isSelected(row)}
          onChange={() => toggle(row)}
          aria-label={`Select row`}
        />
      </StyledTd>
    );
  return (
    <StyledTd $density={density} data-label={headerName ?? fieldName}>
      <ComponentRenderer
        component={render ? render(row) : (row[fieldName] as string)}
        row={row as Record<string, unknown>}
      />
    </StyledTd>
  );
};
