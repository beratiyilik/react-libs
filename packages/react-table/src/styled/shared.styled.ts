import { styled } from "styled-components";

export const StyledPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
`;

export const StyledPaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;
  transition: background-color 150ms ease;
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.surface};
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

export const StyledPaginationSelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;
  height: 1.75rem;
`;

export const StyledPaginationPageInfo = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.muted};
  white-space: nowrap;
`;

export const StyledTableSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
`;

export const StyledTableSummaryText = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

export const StyledTableSummaryDebug = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.info};
`;

export const StyledFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledFilterIconRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledFilterToggleButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  transition: color 150ms ease;
  flex-shrink: 0;
  &:hover {
    color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.foreground)};
  }
`;

export const StyledFilterInputWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const StyledFilterInput = styled.input`
  width: 100%;
  height: 1.5rem;
  padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  outline: none;
  box-sizing: border-box;
  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledSortButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 1.25rem;
  height: 1.25rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.muted};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;
  flex-shrink: 0;
  transition: color 150ms ease;
  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledSortAndNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const StyledHeaderName = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
