import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentRenderer } from "./component-renderer.js";

describe("ComponentRenderer", () => {
  it("renders a string", () => {
    render(<ComponentRenderer component="hello" />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("renders a valid React element", () => {
    render(<ComponentRenderer component={<span>element</span>} />);
    expect(screen.getByText("element")).toBeInTheDocument();
  });

  it("renders a function component", () => {
    const Comp = () => <div>function</div>;
    render(<ComponentRenderer component={Comp} />);
    expect(screen.getByText("function")).toBeInTheDocument();
  });

  it("passes props to function component", () => {
    const Comp = ({ label }: Record<string, unknown>) => <div>{String(label)}</div>;
    render(<ComponentRenderer component={Comp} props={{ label: "passed" }} />);
    expect(screen.getByText("passed")).toBeInTheDocument();
  });

  it("returns null for null", () => {
    const { container } = render(<ComponentRenderer component={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("returns null for undefined", () => {
    const { container } = render(<ComponentRenderer component={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
});
