import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Category from "../../src/components/Feature/Category";
import categoryData from "../MockData";

describe("Category Component", () => {
  const renderCategory = (url = "/") => { 
    render(
      <MemoryRouter initialEntries={[url]}>
        <Category categoryData={categoryData} />
      </MemoryRouter>
    );
  }
  it("renders correct data when on Home Page", () => {
    renderCategory();
    
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toHaveClass(/button_big/);
    expect(screen.getByText("Shoes")).toBeInTheDocument();
    expect(screen.getByText("Shoes")).toHaveClass(/button_big/);
    expect(screen.getAllByRole('img').length).toBe(2);
  });

  it("renders correct data when on Poducts Page", () => {
    renderCategory('/products/');
    
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toHaveClass(/button_small/);
    expect(screen.getByText("Shoes")).toBeInTheDocument();
    expect(screen.getByText("Shoes")).toHaveClass(/button_small/);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("All")).toHaveClass(/button_small/);
    expect(screen.queryByRole('img')).toBe(null);
  });

})