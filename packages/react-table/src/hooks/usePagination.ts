import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "@beratiyilik/react-components";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 250, label: "250" },
];

export const usePagination = <T extends Record<string, unknown>>(data: T[]) => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(data.length / pageSize)),
    [data.length, pageSize],
  );

  const debouncedCurrentPage = useDebounce(currentPage, 150);

  const paginatedData = useMemo(() => {
    const startIndex = (debouncedCurrentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, debouncedCurrentPage, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(DEFAULT_PAGE);
  }, [currentPage, totalPages]);

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    data: paginatedData,
    totalPages,
  };
};
