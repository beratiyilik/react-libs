import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./use-local-storage.js";

beforeEach(() => window.localStorage.clear());

describe("useLocalStorage", () => {
  it("returns initial value when key is not set", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("returns stored value when key exists", () => {
    window.localStorage.setItem("key", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("stored");
  });

  it("updates state and localStorage on setValue", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initial"));
    act(() => result.current[1]("updated"));
    expect(result.current[0]).toBe("updated");
    expect(window.localStorage.getItem("key")).toBe(JSON.stringify("updated"));
  });

  it("supports object values", () => {
    const { result } = renderHook(() =>
      useLocalStorage<{ a: number }>("key", { a: 1 }),
    );
    act(() => result.current[1]({ a: 42 }));
    expect(result.current[0]).toEqual({ a: 42 });
  });

  it("throws when key is empty", () => {
    expect(() =>
      renderHook(() => useLocalStorage("", "value")),
    ).toThrow("useLocalStorage key may not be falsy");
  });
});