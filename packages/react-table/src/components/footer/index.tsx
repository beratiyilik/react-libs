"use client";
import type { ReactNode } from "react";
import { StyledTfoot, StyledTr, StyledTd } from "../../styled/index.js";
import { ComponentRenderer } from "../shared.components.js";

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            margin: "10px",
            gap: "10px",
          }}
        >
          {components.map((component, index) => (
            <div key={index} style={{ margin: "0 10px" }}>
              <ComponentRenderer component={component} />
            </div>
          ))}
        </div>
      </StyledTd>
    </StyledTr>
  </StyledTfoot>
);
