import { styled } from "styled-components";

export const StyledTableContainer = styled.div`
  background-color: #e9e0c9;
`;

export const StyledTable = styled.table`
  position: relative;
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;
  border-collapse: separate;
`;

export const StyledThead = styled.thead``;

export const StyledTbody = styled.tbody``;

export const StyledTfoot = styled.tfoot``;

export const StyledTr = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const StyledTh = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

export const StyledTd = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;

  &:last-child {
    text-align: right;
  }
`;

export const StyledCaption = styled.caption`
  padding: 8px;
  text-align: left;
  font-weight: bold;
`;

export const StyledColgroup = styled.colgroup``;

export const StyledCol = styled.col<{ $width?: string; $color?: string }>`
  width: ${({ $width }) => $width ?? "auto"};
  background-color: ${({ $color }) => $color ?? "transparent"};
`;
