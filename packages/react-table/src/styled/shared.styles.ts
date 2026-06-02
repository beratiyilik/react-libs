import { styled } from "styled-components";

export const StyledPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
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
  height: ${({ theme }) => theme.control.sm.height};
`;

export const StyledPaginationPageInfo = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
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
  color: ${({ theme }) => theme.colors.mutedForeground};
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
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
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
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.foreground};
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
