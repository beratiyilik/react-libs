"use client";
import type { ReactNode } from "react";
import { StyledTfoot, StyledTr, StyledTd } from "../../styled/index.js";
import { ComponentRenderer } from "../component-renderer/index.js";

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
            <ComponentRenderer key={index} component={component} />
          ))}
        </div>
      </StyledTd>
    </StyledTr>
  </StyledTfoot>
);
