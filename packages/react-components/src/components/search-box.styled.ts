import { styled } from "styled-components";

export const StyledSearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.background};
  width: fit-content;
`;

export const StyledSearchBoxLabel = styled.label`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.foreground};
  white-space: nowrap;
`;

export const StyledSearchBoxInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
