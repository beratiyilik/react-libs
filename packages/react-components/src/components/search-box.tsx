"use client";
import type { ChangeEvent } from "react";
import {
  StyledSearchBoxContainer,
  StyledSearchBoxLabel,
  StyledSearchBoxInput,
} from "./search-box.styled.js";

export type SearchBoxProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  passive?: boolean;
};

export const SearchBox = ({ searchTerm, setSearchTerm, passive = false }: SearchBoxProps) => {
  if (passive) return null;
  return (
    <StyledSearchBoxContainer>
      <StyledSearchBoxLabel htmlFor="search">Search</StyledSearchBoxLabel>
      <StyledSearchBoxInput
        id="search"
        type="text"
        value={searchTerm}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => setSearchTerm(target.value)}
      />
    </StyledSearchBoxContainer>
  );
};
