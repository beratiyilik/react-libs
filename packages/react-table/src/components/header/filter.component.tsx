"use client";
import type { ChangeEvent } from "react";
import { StyledFilterContainer, StyledFilterInput } from "../../styled/index.js";
import type { FilterState } from "../../types/index.js";

export const Filter = ({
  field,
  passive,
  filter,
  setFilter,
}: {
  field: string;
  passive: boolean;
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
}) => {
  if (passive) return null;
  return (
    <StyledFilterContainer>
      <StyledFilterInput
        type="text"
        value={filter.value}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setFilter({ field, value: target.value })
        }
      />
    </StyledFilterContainer>
  );
};
