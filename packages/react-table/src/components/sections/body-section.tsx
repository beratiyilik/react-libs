"use client";
import { useMemo } from "react";
import { useTable } from "../../context/table.context.js";
import {
  StyledTbody,
  StyledTr,
  StyledEmptyState,
  StyledSkeletonCell,
  StyledErrorCell,
} from "../../styled/index.js";
import { BodyRow } from "../body/index.js";

const SKELETON_ROW_COUNT = 5;

export const BodySection = () => {
  const {
    options: { fieldOptions },
    selection: { toggle, isSelected },
    processedData,
    density,
    loading,
    error,
  } = useTable();

  const colSpan = fieldOptions.length;

  const memoizedBody = useMemo(
    () =>
      processedData.map((row, index) => (
        <BodyRow
          key={index}
          row={row}
          fieldOptions={fieldOptions}
          toggle={toggle}
          isSelected={isSelected}
        />
      )),
    [processedData, fieldOptions, toggle, isSelected],
  );

  if (loading) {
    return (
      <StyledTbody role="status" aria-busy="true" aria-label="Loading data">
        {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
          <StyledTr key={i}>
            {Array.from({ length: colSpan }, (__, j) => (
              <StyledSkeletonCell key={j} $density={density}>
                <span />
              </StyledSkeletonCell>
            ))}
          </StyledTr>
        ))}
      </StyledTbody>
    );
  }

  if (error) {
    return (
      <StyledTbody>
        <StyledTr>
          <StyledErrorCell colSpan={colSpan}>{error}</StyledErrorCell>
        </StyledTr>
      </StyledTbody>
    );
  }

  if (processedData.length === 0) {
    return (
      <StyledTbody>
        <StyledTr>
          <StyledEmptyState colSpan={colSpan}>No records found</StyledEmptyState>
        </StyledTr>
      </StyledTbody>
    );
  }

  return <StyledTbody>{memoizedBody}</StyledTbody>;
};
