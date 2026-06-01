"use client";
import { useMemo } from "react";
import { useTable } from "../../context/table.context.js";
import { SearchBox } from "@beratiyilik/react-components";
import { ComponentRenderer } from "../component-renderer/index.js";
import { Pagination } from "../pagination/index.js";
import {
  StyledCaption,
  StyledCaptionInner,
  StyledCaptionName,
  StyledCaptionActions,
  StyledColgroup,
  StyledCol,
} from "../../styled/index.js";

export const TopSection = () => {
  const {
    options: { name, fieldOptions, searchable, pagination: hasPagination, headerComponents = [] },
    search: { searchTerm, setSearchTerm },
    pagination: { currentPage, setCurrentPage, pageSize, setPageSize, totalPages },
  } = useTable();

  const memoizedSearchBox = useMemo(
    () => <SearchBox passive={!searchable} value={searchTerm} onChange={setSearchTerm} />,
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
        <StyledCaptionInner>
          <StyledCaptionName>{name}</StyledCaptionName>
          <StyledCaptionActions>
            {components.map((component, index) => (
              <ComponentRenderer key={index} component={component} />
            ))}
          </StyledCaptionActions>
        </StyledCaptionInner>
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
