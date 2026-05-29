import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { useDebounce } from "@beratiyilik/react-components";
import type { FilterState } from "../types/index.js";

export const useFilters = <T extends Record<string, unknown>>(data: T[]) => {
  const [filters, setFilters] = useState<FilterState[]>([]);

  const debouncedFilters = useDebounce(filters, 300);

  const fuseOptions = useMemo(
    () => ({
      keys: debouncedFilters.map((f) => f.field),
      includeScore: true,
      threshold: 0.3,
    }),
    [debouncedFilters],
  );

  const fuse = useMemo(() => new Fuse(data, fuseOptions), [data, fuseOptions]);

  const filteredData = useMemo(() => {
    if (debouncedFilters.length === 0) return data;
    return debouncedFilters.reduce<T[]>((acc, filter) => {
      const result = fuse.search(filter.value);
      return acc.concat(result.map((item) => item.item));
    }, []);
  }, [debouncedFilters, fuse, data]);

  return { filters, setFilters, data: filteredData };
};
