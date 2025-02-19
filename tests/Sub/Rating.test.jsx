import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Rating from "../../src/components/Rating/Rating";

describe("Rating Component", () => {
  const renderRating = (itemRating, url = "/") => {
    render(
      <MemoryRouter initialEntries={[url]}>
        <Rating itemRate={itemRating}/>
      </MemoryRouter>
    )
  };

  it("display correct content based on rating", () => {
    renderRating({ rate: 3.5, count: 200});

    const starImg = screen.getAllByRole('img')
    const output = {};
    starImg.map(img => {
      output[img.alt] = (output[img.alt] || 0) + 1;
    });
    expect(starImg.length).toBe(5)
    expect(output['Star']).toBe(3);
    expect(output['Half Star']).toBe(1);
    expect(output['Empty Star']).toBe(1);
    expect(screen.getByText('(200)')).toBeInTheDocument() 
  });

  it("implements correct class when on Home Page", () => {
    renderRating({ rate: 3.5, count: 200});
    const text = screen.getByText('(200)')
    expect(text).toHaveClass(/rating_container_home/)
  });

  it("correct content when on Product Page", () => {
    renderRating({ rate: 3.5, count: 200}, "/product-page");

    expect(screen.getByText('3.5')).toBeInTheDocument();
    const text = screen.getByText('200 ratings') // Confirms count text
    expect(text.parentElement).toHaveClass(/rating_container_buy/)
  })

})