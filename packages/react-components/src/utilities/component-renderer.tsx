import { isValidElement, type ReactNode } from "react";

export type ComponentRendererProps = {
  component: ReactNode | ((props: Record<string, unknown>) => ReactNode);
  props?: Record<string, unknown>;
};

export const ComponentRenderer = ({ component, props = {} }: ComponentRendererProps): ReactNode => {
  if (typeof component === "function") {
    const Component = component as (props: Record<string, unknown>) => ReactNode;
    return <Component {...props} />;
  }
  if (isValidElement(component)) return component;
  if (typeof component === "string") return <>{component}</>;
  return null;
};
