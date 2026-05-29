import { useState, useCallback, useEffect } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@beratiyilik/browser-utils";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  if (!key) throw new Error("useLocalStorage key may not be falsy");

  const readValue = useCallback((): T => {
    const stored = getLocalStorageItem<T>(key);
    return stored !== null ? stored : initialValue;
  }, [key, initialValue]);

  const [value, setValue] = useState<T>(readValue);

  useEffect(() => {
    setLocalStorageItem(key, value);
  }, [key, value]);

  return [value, setValue];
};