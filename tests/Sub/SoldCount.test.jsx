import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SoldCount from "../../src/components/Sold Count/SoldCount";
import { MemoryRouter } from "react-router-dom";

describe("Sold Count Component", () => {
  const renderSoldCount = (rating) => {
    const { rate, count } = rating;
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <SoldCount rate={rate} count={count} />
      </MemoryRouter>
    )
  }  

  it("correctly calculates sold count", () => {
    renderSoldCount({rate: 4, count: 200})
    expect(screen.getByRole("paragraph").textContent).toBe("800 Sold");
  });
  
  it("shows nothing when sold count is unavailable", () => {
    renderSoldCount({})
    expect(screen.queryByRole("paragraph")).toBe(null);
  });

  it("applies 'sold_count_s' class on cart page", () => {
    renderSoldCount({rate: 4, count: 200})
    const text = screen.getByRole("paragraph")
    console.log(text.className)
    expect(text).toHaveClass(/sold_count_s/);
  });

  it("applies 'sold_count' class on products page", () => {
    const rate = 4;
    const count = 200;
    render(
      <MemoryRouter initialEntries={['/products']}>
        <SoldCount rate={rate} count={count} />
      </MemoryRouter>
    )
    const text = screen.getByRole("paragraph")
    console.log(text.className)
    expect(text).not.toHaveClass(/sold_count_s/);
    expect(text).toHaveClass(/sold_count/);
  });
})