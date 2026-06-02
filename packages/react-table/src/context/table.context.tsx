"use client";
import { createContext, useContext, type ReactNode } from "react";
import { useSearch } from "../hooks/use-search.js";
import { useFilters } from "../hooks/use-filters.js";
import { useSort } from "../hooks/use-sort.js";
import { usePagination } from "../hooks/use-pagination.js";
import { useSelection } from "../hooks/use-selection.js";
import type {
  TableOptions,
  SortState,
  FilterState,
  SelectionState,
  TableDensity,
} from "../types/index.js";

type TableContextValue<T extends Record<string, unknown>> = {
  options: TableOptions<T>;
  data: T[];
  density: TableDensity;
  loading: boolean;
  error: ReactNode | undefined;
  search: { searchTerm: string; setSearchTerm: (v: string) => void; data: T[] };
  filters: {
    filters: FilterState[];
    setFilters: React.Dispatch<React.SetStateAction<FilterState[]>>;
    data: T[];
  };
  sort: {
    sort: Partial<SortState>;
    setSort: React.Dispatch<React.SetStateAction<Partial<SortState>>>;
    data: T[];
  };
  pagination: {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    totalPages: number;
    data: T[];
  };
  selection: SelectionState<T>;
  processedData: T[];
};

const TableContext = createContext<TableContextValue<Record<string, unknown>> | null>(null);

export const useTable = <T extends Record<string, unknown>>() => {
  const context = useContext(TableContext);
  if (!context) throw new Error("useTable must be used within TableProvider");
  return context as TableContextValue<T>;
};

type TableProviderProps<T extends Record<string, unknown>> = {
  children: ReactNode;
  options: TableOptions<T>;
  data: T[];
};

export const TableProvider = <T extends Record<string, unknown>>({
  children,
  options,
  data,
}: TableProviderProps<T>) => {
  const { density = "comfortable", loading = false, error } = options;

  const { data: searchedData, ...restOfSearch } = useSearch(data);
  const { data: filteredData, ...restOfFilters } = useFilters(searchedData);
  const { data: sortedData, ...restOfSort } = useSort(filteredData);
  const pagination = usePagination(sortedData);

  const selectionIdentifier = options.fieldOptions.find(
    ({ selection }) => selection,
  )?.selectionIdentifier;

  const predictiveIdentifier = getPredictiveIdentifier<T>(
    selectionIdentifier ?? options.identifier,
  );

  const selection = useSelection(data, predictiveIdentifier);

  const value = {
    options,
    data,
    density,
    loading,
    error,
    search: { ...restOfSearch, data: searchedData },
    filters: { ...restOfFilters, data: filteredData },
    sort: { ...restOfSort, data: sortedData },
    pagination,
    selection,
    processedData: pagination.data,
  } as unknown as TableContextValue<Record<string, unknown>>;

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

const getPredictiveIdentifier = <T extends Record<string, unknown>>(
  identifier?: string | ((row: T) => (value: T) => boolean),
): ((row: T) => (value: T) => boolean) | undefined => {
  if (typeof identifier === "function") return identifier;
  if (typeof identifier === "string")
    return (row: T) => (value: T) => value[identifier] === row[identifier];
  return undefined;
};
