import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useThrottle } from "./useThrottle.js";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("useThrottle", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useThrottle("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("does not update before interval", () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 500), {
      initialProps: { value: "hello" },
    });
    rerender({ value: "world" });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("hello");
  });

  it("updates after interval", () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 500), {
      initialProps: { value: "hello" },
    });
    rerender({ value: "world" });
    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("world");
  });
});
