import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../src/components/Home Page/Home";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  it("renders correct heading", () => {
    render(
      <BrowserRouter>
            <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", {level: 1}).textContent).toMatch(/home page/i);
  });
});