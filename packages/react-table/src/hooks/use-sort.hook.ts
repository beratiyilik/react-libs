import { useState, useMemo } from "react";
import { useDebounce } from "@beratiyilik/react-components";
import type { SortState } from "../types/index.js";

export const useSort = <T extends Record<string, unknown>>(data: T[]) => {
  const [sort, setSort] = useState<Partial<SortState>>({});

  const debouncedSort = useDebounce(sort, 275);

  const sortedData = useMemo(() => {
    if (!debouncedSort.field) return data;
    return [...data].sort((a, b) => {
      const fieldA = a[debouncedSort.field!] as string | number;
      const fieldB = b[debouncedSort.field!] as string | number;
      return (fieldA < fieldB ? -1 : 1) * (debouncedSort.direction === "asc" ? 1 : -1);
    });
  }, [data, debouncedSort]);

  return { sort, setSort, data: sortedData };
};
