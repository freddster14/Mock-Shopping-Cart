import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Products from "../src/components/Products/Products";

describe("Products Component", () => {
  const renderProducts = () => {
    const categoryData = {
      electronics: [
        {id: 1,
          title: "Samsung TV",
          category: "electronics",
          image: "",
          rating: {rate: 4, count: 200}
        },
        {
          id: 3,
          title: "iPhone",
          category: "electronics",
          image: "",
          rating: {rate: 4, count: 200}
        },
        {
          id: 4,
          title: "Dell Laptop",
          category: "electronics",
          image: "",
          rating: {rate: 4, count: 200}
        },
      ],
      shoes: [
        {
          id: 2,
          title: "Adidas Shoes",
          category: "shoes",
          image: "",
          rating: {rate: 4, count: 200}
        },
       
        
        {
          id: 5,
          title: "Nike Shoes",
          category: "shoes",
          image: "",
          rating: {rate: 4, count: 200}
        },
        {
          id: 6,
          title: "Puma Shoes",
          category: "shoes",
          image: "",
          rating: {rate: 4, count: 200}
        }
      ]
    }
    const selected = null;
    const items = Object.values(categoryData)[0]
    render(
      <MemoryRouter>
        <Products
          items={items} 
          setSelectedItem={selected} 
          categoryData={categoryData} 
        />
      </MemoryRouter>
    )
  }
  it("renders items", () => {
    renderProducts();
  })
  
})