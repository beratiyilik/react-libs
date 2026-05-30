"use client";
import { useMemo } from "react";
import { useTable } from "../../context/table.context.js";
import { StyledTbody, StyledTr, StyledEmptyState } from "../../styled/index.js";
import { BodyRow } from "../body/index.js";

export const BodySection = () => {
  const {
    options: { fieldOptions },
    selection: { toggle, isSelected },
    processedData,
  } = useTable();

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

  if (processedData.length === 0) {
    return (
      <StyledTbody>
        <StyledTr>
          <StyledEmptyState colSpan={fieldOptions.length}>No records found</StyledEmptyState>
        </StyledTr>
      </StyledTbody>
    );
  }

  return <StyledTbody>{memoizedBody}</StyledTbody>;
};
