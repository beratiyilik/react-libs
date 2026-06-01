"use client";
import type { ReactNode } from "react";
import { StyledTfoot, StyledTr, StyledTd } from "../../styled/index.js";
import { ComponentRenderer } from "../ComponentRenderer/index.js";

export const TableFooter = ({
  numberOfHeaders,
  components = [],
}: {
  numberOfHeaders: number;
  components?: ReactNode[];
}) => (
  <StyledTfoot>
    <StyledTr>
      <StyledTd colSpan={numberOfHeaders}>
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          {components.map((component, index) => (
            <div key={index}>
              <ComponentRenderer component={component} />
            </div>
          ))}
        </div>
      </StyledTd>
    </StyledTr>
  </StyledTfoot>
);
