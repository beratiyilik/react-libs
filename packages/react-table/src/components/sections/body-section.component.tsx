"use client";
import { useMemo } from "react";
import { useTable } from "../../context/table.context.js";
import { StyledTbody } from "../../styled/index.js";
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

  return <StyledTbody>{memoizedBody}</StyledTbody>;
};
