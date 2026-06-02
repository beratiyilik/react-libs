"use client";
import type { ChangeEvent } from "react";
import { Button } from "@beratiyilik/react-components";
import {
  StyledPaginationContainer,
  StyledPaginationSelect,
  StyledPaginationPageInfo,
} from "../../styled/index.js";
import { PAGE_SIZE_OPTIONS } from "../../hooks/index.js";

const iconProps = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ChevronDoubleLeft = () => (
  <svg {...iconProps}>
    <path d="M11 17l-5-5 5-5" />
    <path d="M18 17l-5-5 5-5" />
  </svg>
);

const ChevronLeft = () => (
  <svg {...iconProps}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg {...iconProps}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronDoubleRight = () => (
  <svg {...iconProps}>
    <path d="M6 17l5-5-5-5" />
    <path d="M13 17l5-5-5-5" />
  </svg>
);

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
      <Button
        iconOnly
        size="sm"
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(1)}
        aria-label="First page"
      >
        <ChevronDoubleLeft />
      </Button>
      <Button
        iconOnly
        size="sm"
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>
      <Button
        iconOnly
        size="sm"
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
      <Button
        iconOnly
        size="sm"
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(totalPages)}
        aria-label="Last page"
      >
        <ChevronDoubleRight />
      </Button>
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
