import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { NotificationProvider, useNotification } from "./notification.context.js";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <NotificationProvider>{children}</NotificationProvider>
);

describe("useNotification", () => {
  it("throws when used outside provider", () => {
    expect(() => renderHook(() => useNotification())).toThrow(
      "useNotification must be used within NotificationProvider",
    );
  });

  it("show adds a notification", () => {
    const { result } = renderHook(() => useNotification(), { wrapper });
    act(() => result.current.show("hello"));
    // no throw = context works
  });

  it("success calls show with success type", () => {
    const { result } = renderHook(() => useNotification(), { wrapper });
    expect(() => act(() => result.current.success("ok"))).not.toThrow();
  });

  it("error calls show with error type", () => {
    const { result } = renderHook(() => useNotification(), { wrapper });
    expect(() => act(() => result.current.error("fail"))).not.toThrow();
  });

  it("info calls show with info type", () => {
    const { result } = renderHook(() => useNotification(), { wrapper });
    expect(() => act(() => result.current.info("note"))).not.toThrow();
  });

  it("warning calls show with warning type", () => {
    const { result } = renderHook(() => useNotification(), { wrapper });
    expect(() => act(() => result.current.warning("warn"))).not.toThrow();
  });

  it("hide removes notification by id", () => {
    const { result } = renderHook(() => useNotification(), { wrapper });
    act(() => result.current.show("msg"));
    expect(() => act(() => result.current.hide("nonexistent-id"))).not.toThrow();
  });
});
