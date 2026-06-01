import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { useDebounce } from "@beratiyilik/react-components";

export const useSearch = <T extends Record<string, unknown>>(data: T[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fuseOptions = useMemo(
    () => ({
      keys: data.length > 0 ? Object.keys(data[0]!) : [],
      includeScore: true,
      threshold: 0.3,
    }),
    [data],
  );

  const fuse = useMemo(() => new Fuse(data, fuseOptions), [data, fuseOptions]);

  const searchedData = useMemo(() => {
    if (!debouncedSearchTerm) return data;
    return fuse.search(debouncedSearchTerm).map((item) => item.item);
  }, [debouncedSearchTerm, fuse, data]);

  return { searchTerm, setSearchTerm, data: searchedData };
};
