"use client";

import { Stack, Button } from "@beratiyilik/react-components";
import type { HTMLAttributes } from "react";

export type TableProps = Omit<HTMLAttributes<HTMLDivElement>, "onRowClick"> & {
  columns: ReadonlyArray<string>;
  rows: ReadonlyArray<ReadonlyArray<string>>;
  onRowClick?: (row: ReadonlyArray<string>, index: number) => void;
};

export const Table = ({ columns, rows, onRowClick, ...rest }: TableProps) => {
  return (
    <Stack gap="sm" {...rest}>
      <Stack direction="row" gap="md">
        {columns.map((col) => (
          <strong key={col}>{col}</strong>
        ))}
      </Stack>
      {rows.map((row, i) => (
        <Stack key={i} direction="row" gap="md">
          {row.map((cell, j) => (
            <span key={j}>{cell}</span>
          ))}
          {onRowClick && (
            <Button variant="secondary" onClick={() => onRowClick(row, i)}>
              Select
            </Button>
          )}
        </Stack>
      ))}
    </Stack>
  );
};
