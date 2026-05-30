"use client";
import { useMemo } from "react";
import { useTable } from "../../context/table.context.js";
import { TableFooter } from "../footer/index.js";
import { TableSummary, Pagination } from "../shared.components.js";

export const FooterSection = () => {
  const {
    options: { fieldOptions, pagination: hasPagination, debug = false, footerComponents = [] },
    data,
    search: { searchTerm, data: searchedData },
    filters: { filters, data: filteredData },
    sort: { sort },
    pagination: { currentPage, setCurrentPage, pageSize, setPageSize, totalPages },
  } = useTable();

  const memoizedPagination = useMemo(
    () => (
      <Pagination
        passive={!hasPagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
      />
    ),
    [hasPagination, currentPage, setCurrentPage, pageSize, setPageSize, totalPages],
  );

  const memoizedTableSummary = useMemo(
    () => (
      <TableSummary
        passive={false}
        debug={debug}
        fieldOptions={fieldOptions}
        data={data}
        searchTerm={searchTerm}
        filters={filters}
        sort={sort}
        lengthOfFilteredData={filteredData.length}
      />
    ),
    [debug, fieldOptions, data, searchTerm, filters, sort, filteredData.length],
  );

  void searchedData;

  return (
    <TableFooter
      numberOfHeaders={fieldOptions.length}
      components={[...footerComponents, memoizedPagination, memoizedTableSummary]}
    />
  );
};
