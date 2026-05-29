"use client";
import { useMemo } from "react";
import { useTable } from "../../context/table.context.js";
import { SearchBox, ComponentRenderer, Pagination } from "../shared.components.js";
import { StyledCaption, StyledColgroup, StyledCol } from "../../styled/index.js";

export const TopSection = () => {
  const {
    options: { name, fieldOptions, searchable, pagination: hasPagination, headerComponents = [] },
    search: { searchTerm, setSearchTerm },
    pagination: { currentPage, setCurrentPage, pageSize, setPageSize, totalPages },
  } = useTable();

  const memoizedSearchBox = useMemo(
    () => (
      <SearchBox
        passive={!searchable}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    ),
    [searchable, searchTerm, setSearchTerm],
  );

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

  const components = [...headerComponents, memoizedSearchBox, memoizedPagination];

  return (
    <>
      <StyledCaption>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <div>{name}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {components.map((component, index) => (
              <div key={index} style={{ margin: "0 10px" }}>
                <ComponentRenderer component={component} />
              </div>
            ))}
          </div>
        </div>
      </StyledCaption>
      <StyledColgroup>
        {fieldOptions.map(({ width, color }, index) => (
          <StyledCol
            key={index}
            {...(width !== undefined ? { $width: width } : {})}
            {...(color !== undefined ? { $color: color } : {})}
          />
        ))}
      </StyledColgroup>
    </>
  );
};
