import type { ReactNode } from "react";

export type FieldOption<T extends Record<string, unknown>> = {
  fieldName: keyof T & string;
  headerName?: string;
  sortable?: boolean;
  sortFieldName?: string;
  filterable?: boolean;
  filterFieldName?: string;
  selection?: boolean;
  selectionIdentifier?: string;
  width?: string;
  color?: string;
  render?: (row: T) => ReactNode;
};

export type TableOptions<T extends Record<string, unknown>> = {
  name?: string;
  fieldOptions: FieldOption<T>[];
  searchable?: boolean;
  pagination?: boolean;
  debug?: boolean;
  identifier?: string | ((row: T) => (value: T) => boolean);
  headerComponents?: ReactNode[];
  footerComponents?: ReactNode[];
};

export type SortState = {
  field: string;
  direction: "asc" | "desc";
};

export type FilterState = {
  field: string;
  value: string;
};

export type PaginationState = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  data: Record<string, unknown>[];
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  component?: ReactNode;
};

export type SelectionState<T extends Record<string, unknown>> = {
  data: T[];
  toggle: (row: T) => void;
  isSelected: (row: T) => boolean;
  toggleAll: () => void;
  isSelectedAll: boolean;
};
