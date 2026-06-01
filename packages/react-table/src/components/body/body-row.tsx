"use client";
import { StyledTr } from "../../styled/index.js";
import { BodyCell } from "./body-cell.js";
import type { FieldOption } from "../../types/index.js";

export const BodyRow = <T extends Record<string, unknown>>({
  row,
  fieldOptions,
  toggle,
  isSelected,
}: {
  row: T;
  fieldOptions: FieldOption<T>[];
  toggle: (row: T) => void;
  isSelected: (row: T) => boolean;
}) => (
  <StyledTr>
    {fieldOptions.map((fieldOption, index) => (
      <BodyCell
        key={index}
        row={row}
        fieldOption={fieldOption}
        toggle={toggle}
        isSelected={isSelected}
      />
    ))}
  </StyledTr>
);
