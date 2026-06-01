"use client";
import type { ChangeEvent } from "react";
import {
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPaginationSelect,
  StyledPaginationPageInfo,
} from "../../styled/index.js";
import { PAGE_SIZE_OPTIONS } from "../../hooks/index.js";

export const Pagination = ({
  passive,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalPages,
}: {
  passive: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
}) => {
  if (passive) return null;
  return (
    <StyledPaginationContainer>
      <StyledPaginationButton
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      >
        ‹
      </StyledPaginationButton>
      <StyledPaginationButton
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      >
        ›
      </StyledPaginationButton>
      <StyledPaginationSelect
        value={pageSize}
        onChange={({ target }: ChangeEvent<HTMLSelectElement>) =>
          setPageSize(parseInt(target.value))
        }
      >
        {PAGE_SIZE_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </StyledPaginationSelect>
      <StyledPaginationPageInfo>
        {currentPage} / {totalPages}
      </StyledPaginationPageInfo>
    </StyledPaginationContainer>
  );
};
