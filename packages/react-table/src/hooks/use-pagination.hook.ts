import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "@beratiyilik/react-components";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 250, label: "250" },
  { value: 500, label: "500" },
  { value: 1000, label: "1000" },
];

export const usePagination = <T extends Record<string, unknown>>(data: T[]) => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const debouncedCurrentPage = useDebounce(currentPage, 500);

  const paginatedData = useMemo(() => {
    const startIndex = (debouncedCurrentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, debouncedCurrentPage, pageSize]);

  const totalPages = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data.length, pageSize],
  );

  useEffect(() => {
    if (data.length < currentPage * pageSize) setCurrentPage(DEFAULT_PAGE);
  }, [data.length, currentPage, pageSize]);

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    data: paginatedData,
    totalPages,
  };
};
