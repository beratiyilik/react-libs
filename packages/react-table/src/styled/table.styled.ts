import { css, keyframes, styled } from "styled-components";
import type { TableDensity } from "../types/index.js";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const densityCellPadding = {
  compact: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  `,
  comfortable: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  `,
  spacious: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  `,
};

export const StyledTableContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const StyledThead = styled.thead`
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const StyledTbody = styled.tbody``;

export const StyledTfoot = styled.tfoot`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StyledTr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transition.duration.fast}
    ${({ theme }) => theme.transition.easing.default};
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

export const StyledTh = styled.th<{ $density?: TableDensity }>`
  ${({ $density = "comfortable" }) => densityCellPadding[$density]}
  text-align: left;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.foreground};
  white-space: nowrap;
`;

export const StyledTd = styled.td<{ $density?: TableDensity }>`
  ${({ $density = "comfortable" }) => densityCellPadding[$density]}
  text-align: left;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const StyledCaption = styled.caption`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  text-align: left;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const StyledColgroup = styled.colgroup``;

export const StyledCol = styled.col<{ $width?: string; $color?: string }>`
  width: ${({ $width }) => $width ?? "auto"};
  background-color: ${({ $color }) => $color ?? "transparent"};
`;

export const StyledCaptionInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
`;

export const StyledCaptionName = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const StyledCaptionActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StyledEmptyState = styled.td`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  text-align: center;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const StyledSkeletonCell = styled.td<{ $density?: TableDensity }>`
  ${({ $density = "comfortable" }) => densityCellPadding[$density]}
  & > span {
    display: block;
    height: 1rem;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radius.sm};
    animation: ${pulse} 1.5s ease-in-out infinite;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const StyledErrorCell = styled.td`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  text-align: left;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.error};
  border-left: 3px solid ${({ theme }) => theme.colors.error};
`;
