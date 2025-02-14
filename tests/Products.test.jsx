import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "../src/components/Products/Products";
import { useParams, MemoryRouter, useLocation } from "react-router-dom";

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useParams: vi.fn()
  }
})

describe("Products Component", () => {
  const categoryData = {
    electronics: [
      {id: 1,
        title: "Samsung TV",
        category: "electronics",
        image: "",
        price: 1,
        rating: {rate: 1, count: 100}
      },
      {
        id: 3,
        title: "iPhone",
        category: "electronics",
        image: "",
        price: 5,
        rating: {rate: 5, count: 200}
      },
      {
        id: 4,
        title: "Dell Laptop",
        category: "electronics",
        price: 10,
        image: "",
        rating: {rate: 3, count: 300}
      },
    ],
    shoes: [
      {
        id: 2,
        title: "Adidas Shoes",
        category: "shoes",
        price: 100,
        image: "",
        rating: {rate: 2, count: 400}
      },
      {
        id: 5,
        title: "Nike Shoes",
        category: "shoes",
        price: 50,
        image: "",
        rating: {rate: 4, count: 500}
      },
      {
        id: 6,
        title: "Puma Shoes",
        category: "shoes",
        price: 30,
        image: "",
        rating: {rate: 3.3, count: 600}
      }
    ]
  }
  const selected = vi.fn();
  const dataValues = Object.values(categoryData);
  //remove brackets and combine
  const items = dataValues[0].concat(dataValues[1]);
  function MyComponent() {
    const location = useLocation();
    return (
      <>
      <h1>{location.pathname}</h1>
       <Products
      items={items} 
      setSelectedItem={selected} 
      categoryData={categoryData} 
    />
      </>
     
    );
  }
  const renderProducts = (params = "") => {
    useParams.mockReturnValue(params)
    return render(
      <MemoryRouter initialEntries={["/products/"]}>
       <MyComponent/>
      </MemoryRouter>
    )
  }
  it("renders items", () => {
    renderProducts();
    //Sub Nav Elements
    expect(screen.getByRole("link", {name: "Electronics"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "Shoes"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "All"})).toBeInTheDocument();
    expect(screen.getByRole("option", {name: "Sort By"})).toBeInTheDocument();
    expect(screen.getAllByText(/Price:/).length).toBe(2);
    expect(screen.getAllByText(/Rating:/).length).toBe(2);

    //2 items
    expect(screen.getByText("Samsung TV")).toBeInTheDocument();
    expect(screen.getByText("Adidas Shoes")).toBeInTheDocument();
    expect(screen.getByText("(200)")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    //Rating Component
    // expect(screen.getAllByAltText("Star").length).toBe(3 * 6) // 3 = stars per item and 6 = items 
    // expect(screen.getAllByAltText("Half Star").length).toBe(6)
    // expect(screen.getAllByAltText("Empty Star").length).toBe(6)

  
  })

  it("setSelected function runs on click", async () => {
    const user = userEvent.setup();

    renderProducts();

    expect(selected).not.toHaveBeenCalledOnce();
    await user.click(screen.getByText("Samsung TV"));
    //confirm navigation
    expect(screen.getByText("/product-page")).toBeInTheDocument();
    expect(selected).toHaveBeenCalledOnce();
  });

  describe("renders correct items based on url category/params", () => {
    it("renders electronic items on load", async () => {
      const user = userEvent.setup();

      renderProducts({ category: "electronics"});
      expect(screen.getByText("/products/")).toBeInTheDocument();

      await user.click(screen.getByText("Electronics"))

      expect(screen.getByText("/products/electronics")).toBeInTheDocument();
      expect(screen.getByText("iPhone")).toBeInTheDocument();
      expect(screen.queryByText("Nike Shoes")).not.toBeInTheDocument();
    });

    it("renders shoes items on load", async () => {
      const user = userEvent.setup();

      renderProducts({ category: "shoes"});
      expect(screen.getByText("/products/")).toBeInTheDocument();

      await user.click(screen.getByText("Shoes"))
      expect(screen.queryByText("iPhone")).not.toBeInTheDocument();
      expect(screen.getByText("Nike Shoes")).toBeInTheDocument();
    })
  })

  describe("sort items bases on selected option", () => {
    const user = userEvent.setup();
    const checkSort = (sortBy, textArray) => {
      let prevText = null;
      for(let e of textArray) {
        let text = e.textContent;
        if(sortBy.includes('price')) text = Number(text.slice(1));

        if(prevText) {
          if(prevText > text && sortBy.includes('ascending')) {
            prevText = "not sorted"
            break;
          } else if (prevText < text && sortBy.includes('descending')) {
            prevText = "not sorted"
            break;
          }
        }
        prevText = text
      }
      if(prevText !== 'not sorted') {
        return true
      } else {
        return false
      }
    }

    it("sorts by price", async () => {
      renderProducts();
      const selectElement = screen.getByRole('combobox');
      //Price-Ascending Check
      await user.selectOptions(selectElement, 'price-ascending')
      let arrayOfPrice = screen.getAllByText(
        (content, element ) => element.className.includes("_price_0612a2")
      );
      expect(checkSort('price-ascending', arrayOfPrice)).toBe(true)
      //Price-Descending Check
      await user.selectOptions(selectElement, 'price-descending');
      arrayOfPrice = screen.getAllByText(
        (content, element ) => element.className.includes("_price_0612a2")
      );
      expect(checkSort('price-descending', arrayOfPrice)).toBe(true)
    })
    it("sort by rating", () => {
      
    })
    
  })
})