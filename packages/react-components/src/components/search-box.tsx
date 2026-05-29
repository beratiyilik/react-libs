"use client";
import { styled } from "styled-components";
import type { ChangeEvent } from "react";

export type SearchBoxProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  passive?: boolean;
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: fit-content;
`;

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333;
  margin-right: 10px;
  flex: 1;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  flex: 4;
`;

export const SearchBox = ({ searchTerm, setSearchTerm, passive = false }: SearchBoxProps) => {
  if (passive) return null;
  return (
    <StyledContainer>
      <StyledLabel htmlFor="search">Search</StyledLabel>
      <StyledInput
        id="search"
        type="text"
        value={searchTerm}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => setSearchTerm(target.value)}
      />
    </StyledContainer>
  );
};
