import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "../../src/components/Products/Products";
import NavBar from "../../src/components/Nav Bar/NavBar";
import { useParams, MemoryRouter, useLocation } from "react-router-dom";
import categoryData from "../MockData";
import { DataContext } from "../../src/components/Home Page/Home";

//Mock react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useParams: vi.fn()
  }
})

describe("Products Component", () => {
  

  const selected = vi.fn();
  const data = Object.values(categoryData).flat();

  function MyComponent() {
    const location = useLocation();
    return (
      <DataContext.Provider value={{data}}>
        <p>{location.pathname}</p>
        <NavBar cart={data}/>
        <Products setSelectedItem={selected} categoryData={categoryData} />
      </DataContext.Provider>

    );
  }

  const renderProducts = (params = "") => {
    useParams.mockReturnValue({ category: params })
    return render(
      <MemoryRouter initialEntries={[`/products/${params}`]}>
        <MyComponent/>
      </MemoryRouter>
    )
  }

  it("renders all items given no category/initial start", () => {
    renderProducts();

    expect(screen.getByRole("link", {name: "Electronics"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "Shoes"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "All"})).toBeInTheDocument();
    expect(screen.getByRole("option", {name: "Sort By"})).toBeInTheDocument();
    expect(screen.getAllByText(/Price:/).length).toBe(2);
    expect(screen.getAllByText(/Rating:/).length).toBe(2);
    expect(screen.getByText("Samsung TV")).toBeInTheDocument();
    expect(screen.getByText("Adidas Shoes")).toBeInTheDocument();
    expect(screen.getByText("(200)")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("renders last category when switching component/ useEffect logic", async () => {
    const user = userEvent.setup();
    renderProducts("electronics")
    expect(screen.getByText("/products/electronics")).toBeInTheDocument();

    await user.click(screen.getByRole('link', {name: 'Home'}))
    expect(screen.getByText("/")).toBeInTheDocument();

    await user.click(screen.getByRole('link', {name: 'Products'}))
    expect(screen.getByText("/products/electronics")).toBeInTheDocument();
  })

  it("setSelected function runs on click", async () => {
    const user = userEvent.setup();
    renderProducts();

    expect(selected).not.toHaveBeenCalledOnce();
    await user.click(screen.getByText("Samsung TV"));
    expect(screen.getByText("/product-page")).toBeInTheDocument();
    expect(selected).toHaveBeenCalledOnce();
  });

  describe("renders correct items based on url category/params", () => {
    it("renders electronic items on load", async () => {
      const user = userEvent.setup();

      renderProducts("electronics");
      expect(screen.getByText("/products/electronics")).toBeInTheDocument();

      await user.click(screen.getByText("Electronics"))

      expect(screen.getByText("/products/electronics")).toBeInTheDocument();
      expect(screen.getByText("iPhone")).toBeInTheDocument();
      expect(screen.queryByText("Nike Shoes")).not.toBeInTheDocument();
    });

    it("renders shoes items on load", async () => {
      const user = userEvent.setup();
      renderProducts("shoes");

      expect(screen.getByText("/products/shoes")).toBeInTheDocument();
      await user.click(screen.getByText("Shoes"))
      expect(screen.queryByText("iPhone")).not.toBeInTheDocument();
      expect(screen.getByText("Nike Shoes")).toBeInTheDocument();
    })
  })

  describe("Sort Logic", () => {
    const user = userEvent.setup();
    const checkSort = (sortBy, arrayOfValues) => {
      if(sortBy === "") return false
      let isSorted = true;
      for(let i = 1; i < arrayOfValues.length; i++) {
        const currentVal = arrayOfValues[i]
        const prevVal = arrayOfValues[i - 1]
        if ((sortBy.includes('ascending') && prevVal > currentVal) || 
            (sortBy.includes('descending') && prevVal < currentVal)) {
          isSorted = false;
          break;
        }
      }
      return isSorted
    }

    it("sorts by price", async () => {
      renderProducts();
      const sortDropdown = screen.getByRole('combobox');
      const extractPrices = () => {
        return screen.getAllByText(
          (content, element) => element.className.includes("_price_0612a2")
        ).map(priceElement => Number(priceElement.textContent.slice(1))); // Remove the "$" and convert to number
      };
      // Not sorted
      let prices = extractPrices();
      expect(checkSort(`${sortDropdown.value}`, prices)).toBe(false)
      // Price-Ascending Check
      await user.selectOptions(sortDropdown, 'price-ascending')
      prices = extractPrices();
      expect(checkSort(`${sortDropdown.value}`, prices)).toBe(true)
      // Price-Descending Check
      await user.selectOptions(sortDropdown, 'price-descending');
      prices = extractPrices();
      expect(checkSort(`${sortDropdown.value}`, prices)).toBe(true)
    })

    it("sort by rating", async () => {
      renderProducts();
      const sortDropdown = screen.getByRole('combobox');
      const extractRatings = () => {
        const ratings = screen.getAllByRole('heading')
          .map(item => item.textContent)
          .slice(1)
        // Replace the heading titles with their corresponding ratings
        data.forEach(item => {
          const index = ratings.indexOf(item.title);
          if(index !== -1) {
            ratings[index] = item.rating.rate
          }
        })
        return ratings
      }
      
      // Not sorted
      let ratings = extractRatings();
      expect(checkSort(`${sortDropdown.value}`, ratings)).toBe(false)
      // Rate-Ascending Check
      await user.selectOptions(sortDropdown, 'rating-ascending')
      ratings = extractRatings();
      expect(checkSort(`${sortDropdown.value}`, ratings)).toBe(true)
      // Rate-Descending Check
      await user.selectOptions(sortDropdown, 'rating-descending');
      ratings = extractRatings();
      expect(checkSort(`${sortDropdown.value}`, ratings)).toBe(true)
    })

    it("items stay sorted when switching component", async () => {
      renderProducts();
      const sortDropdown = screen.getByRole('combobox');
      const extractPrices = () => {
        return screen.getAllByText(
          (content, element) => element.className.includes("_price_0612a2")
        ).map(priceElement => Number(priceElement.textContent.slice(1))); // Remove the "$" and convert to number
      };
      expect(screen.getByText("/products/")).toBeInTheDocument();
      // Sort Items
      await user.selectOptions(sortDropdown, 'price-ascending')
      let prices = extractPrices();
      await expect(checkSort(`${sortDropdown.value}`, prices)).toBe(true);
      // User goes Home
      await user.click(screen.getByRole('link', {name: 'Home'}))
      expect(screen.getByText("/")).toBeInTheDocument();
      // User goes back to Products
      await user.click(screen.getByRole('link', {name: 'Products'}))
      expect(screen.getByText("/products/")).toBeInTheDocument();
      // Regain items on screen
      prices = extractPrices();
      await expect(checkSort(`${sortDropdown.value}`, prices)).toBe(true);
    })
  })
})