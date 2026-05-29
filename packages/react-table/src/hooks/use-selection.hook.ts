import { useState } from "react";
import { useDebounce } from "@beratiyilik/react-components";

type PredictiveIdentifier<T> = (row: T) => (value: T) => boolean;

const DEFAULT_PREDICTIVE_IDENTIFIER = <T extends Record<string, unknown>>(
  row: T,
) => (value: T) => value["id"] === row["id"];

export const useSelection = <T extends Record<string, unknown>>(
  data: T[],
  predictiveIdentifier: PredictiveIdentifier<T> = DEFAULT_PREDICTIVE_IDENTIFIER,
) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const debouncedSelectedRows = useDebounce(selectedRows, 275);

  const toggle = (row: T) => {
    const index = selectedRows.findIndex(predictiveIdentifier(row));
    const newSelectedRows =
      index === -1
        ? [...selectedRows, row]
        : selectedRows.filter((_, i) => i !== index);
    setSelectedRows(newSelectedRows);
  };

  const isSelected = (row: T) =>
    debouncedSelectedRows.some(predictiveIdentifier(row));

  const isSelectedAll = data.length > 0 && data.every(isSelected);

  const toggleAll = () => {
    setSelectedRows(isSelectedAll ? [] : [...data]);
  };

  return {
    data: debouncedSelectedRows,
    toggle,
    isSelected,
    toggleAll,
    isSelectedAll,
  };
};
