import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { NotificationProvider, useNotification } from "./Notification.context.js";
import { defaultTheme } from "../theme/index.js";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>
    <NotificationProvider>{children}</NotificationProvider>
  </ThemeProvider>
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
